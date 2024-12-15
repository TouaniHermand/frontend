<template>
  <div class="container mt-5">
    <h2 class="mb-4">Liste des Tâches</h2>

    <!-- Affichage du spinner pendant le chargement -->
    <div v-if="taskStore.isLoading" class="d-flex justify-content-center">
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>

    <div v-if="taskStore.error" class="alert alert-danger">
      {{ taskStore.error.message }}
    </div>

    <!-- Filtrage des tâches -->
    <div class="mb-3">
      <label for="statusFilter" class="form-label">Filtrer par statut</label>
      <select id="statusFilter" v-model="filterStatus" class="form-select">
        <option value="">Tous</option>
        <option value="completed">Terminées</option>
        <option value="pending">En attente</option>
      </select>
    </div>

    <TaskForm :taskToEdit="taskToEdit" @taskAdded="taskStore.fetchTasks" />

    <ul class="list-group mt-4">
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <TaskItem :task="task" @taskToEdit="handleTaskToEdit" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/taskStore";
import TaskItem from "./TaskItem.vue";
import TaskForm from "./TaskForm.vue";
import { ref, computed } from "vue";

const taskStore = useTaskStore();
taskStore.fetchTasks();

const taskToEdit = ref(null);
const filterStatus = ref("");

const handleTaskToEdit = (task) => {
  taskToEdit.value = task;
};

// Calculer les tâches filtrées en fonction du statut sélectionné
const filteredTasks = computed(() => {
  if (filterStatus.value === "") {
    return taskStore.tasks;
  }
  return taskStore.tasks.filter((task) => task.status === filterStatus.value);
});
</script>

<style scoped>
.task-item {
  cursor: pointer;
  width: 80%;
  height: 150px;
  margin: 0 auto;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
