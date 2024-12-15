import { defineStore } from "pinia";
import axios from "axios";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchTasks() {
      this.isLoading = true;
      try {
        const response = await axios.get("http://localhost:8000/api/tasks");
        this.tasks = response.data;
        console.log(this.tasks);
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },

    async addTask(task) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/tasks",
          task
        );
        this.tasks.push(response.data.data);
      } catch (err) {
        this.error = err;
      }
    },

    async updateTask(id, updatedTask) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/tasks/${id}`,
          updatedTask
        );
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
          this.tasks[index] = response.data.data;
        }
      } catch (err) {
        this.error = err;
      }
    },
    async deleteTask(id) {
      try {
        await axios.delete(`http://localhost:8000/api/tasks/${id}`);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (err) {
        this.error = err;
      }
    },
  },
});
