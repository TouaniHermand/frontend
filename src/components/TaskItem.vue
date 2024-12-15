<template>
  <div
    class="task-item d-flex justify-content-between align-items-center mb-3 p-3 border rounded shadow-sm bg-light"
    :class="{ 'bg-success': task.status === 'completed' }"
  >
    <div class="task-details">
      <h5>{{ task.title }}</h5>
      <p>{{ task.description }}</p>
      <span
        class="badge"
        :class="{
          'bg-success': task.status === 'completed',
          'bg-secondary': task.status !== 'completed',
        }"
      >
        {{ task.status }}
      </span>
    </div>
    <div class="task-actions">
      <button @click="toggleStatus" class="btn btn-sm btn-warning me-2">
        Changer le statut
      </button>
      <button @click="confirmDelete" class="btn btn-sm btn-danger me-2">
        Supprimer
      </button>
      <button @click="editTask" class="btn btn-sm btn-info">Modifier</button>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/taskStore";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  task: Object,
});

const taskStore = useTaskStore();
const emit = defineEmits();

const toggleStatus = () => {
  const updatedTask = {
    ...props.task,
    status: props.task.status === "completed" ? "pending" : "completed",
  };
  taskStore.updateTask(props.task.id, updatedTask);
};

// Fonction de confirmation avant suppression
const confirmDelete = () => {
  const confirmed = window.confirm(
    "Êtes-vous sûr de vouloir supprimer cette tâche ?"
  );
  if (confirmed) {
    deleteTask();
  }
};

const deleteTask = () => {
  taskStore.deleteTask(props.task.id);
};

const editTask = () => {
  // Émettre l'événement 'taskToEdit' pour informer le parent qu'on veut éditer cette tâche
  taskStore.deleteTask(props.task.id);
};
</script>

<style scoped>
.task-item {
  cursor: pointer;
  width: 80%;
  height: 150px;
  margin: 0 auto;
}
</style>
