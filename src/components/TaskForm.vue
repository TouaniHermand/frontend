<template>
  <form
    @submit.prevent="submitForm"
    class="p-4 border rounded shadow-sm bg-light"
  >
    <h4 class="mb-4">
      {{ isEditMode ? "Modifier la Tâche" : "Ajouter une Nouvelle Tâche" }}
    </h4>

    <div class="mb-3">
      <label for="title" class="form-label">Titre</label>
      <input v-model="title" id="title" class="form-control" required />
    </div>

    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea
        v-model="description"
        id="description"
        class="form-control"
        required
      ></textarea>
    </div>

    <div class="mb-3">
      <label for="status" class="form-label">Statut</label>
      <select v-model="status" id="status" class="form-select">
        <option value="pending">En attente</option>
        <option value="completed">Complété</option>
      </select>
    </div>

    <button type="submit" class="btn btn-primary">
      {{ isEditMode ? "Sauvegarder les modifications" : "Ajouter la tâche" }}
    </button>
  </form>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted } from "vue";
import { useTaskStore } from "../stores/taskStore";

// Déclaration des variables réactives
const title = ref("");
const description = ref("");
const status = ref("pending");
const isEditMode = ref(false);

// Utilisation du store Pinia
const taskStore = useTaskStore();

// Émission de l'événement après l'ajout ou modification de la tâche
const emit = defineEmits();

// Pour accepter un task existant lors de l'édition
const props = defineProps({
  taskToEdit: Object,
});

// Initialisation en mode édition
onMounted(() => {
  if (props.taskToEdit) {
    isEditMode.value = true;
    title.value = props.taskToEdit.title;
    description.value = props.taskToEdit.description;
    status.value = props.taskToEdit.status;
  }
});

// Fonction pour soumettre le formulaire
const submitForm = async () => {
  const task = {
    title: title.value,
    description: description.value,
    status: status.value,
  };

  if (isEditMode.value) {
    // Mise à jour de la tâche existante
    await taskStore.updateTask(props.taskToEdit.id, task);
  } else {
    // Ajout de la nouvelle tâche
    await taskStore.addTask(task);
  }

  // Réinitialisation des champs du formulaire
  title.value = "";
  description.value = "";
  status.value = "pending";

  // Émettre l'événement après l'ajout ou la modification de la tâche
  emit("taskAdded");
};
</script>

<style scoped>
form {
  background-color: #f8f9fa;
}
</style>
