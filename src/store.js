import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export const useBudgetStore = defineStore("budget", {
  state: () => ({
    spendTypes: [
      { id: 1, name: "Fixed" },
      { id: 2, name: "FnB" },
      { id: 3, name: "Laundry" },
      { id: 4, name: "Friends" },
      { id: 5, name: "Other" },
    ],
    defaultSpendType: 1,
    selectedDate: new Date().toLocaleDateString("en-CA"),
    spendings: {},
    editingItem: undefined,
  }),
  getters: {
    todaySpending(state) {
      let today = state.getCurrentDateTime();
      return state.spendings[today.date];
    },
    totalSpendingBySelectedDate(state) {
      const spendings = state.getSpendingByDate(state.selectedDate);
      let total = 0;
      spendings.forEach((item) => {
        total += item.amount;
      });
      return new Intl.NumberFormat("en-US").format(total * 1000);
    },
  },
  actions: {
    loadLocalStorage() {
      let rawData = localStorage.getItem("spendings");
      if (rawData) {
        this.spendings = JSON.parse(rawData);
      }
      if (!Object.keys(this.spendings).includes(this.getCurrentDateTime().date)) {
        this.spendings[this.getCurrentDateTime().date] = [];
      }
    },
    addSpending(spending) {
      const today = this.getCurrentDateTime();
      const uid = uuid();

      if (!this.spendings[today.date]) {
        this.spendings[today.date] = [];
      }

      this.spendings[today.date].push({
        uid: uid,
        createdAt: today.time,
        type: spending.type,
        text: spending.text,
        amount: spending.amount,
      });
    },
    deleteSpending() {
      const removed = this.spendings[this.selectedDate].filter((spending) => {
        return spending.uid != this.editingItem.uid;
      });
      this.spendings[this.selectedDate] = removed;
      this.editingItem = undefined;
    },
    updateSpending() {
      for (let i = 0; i < this.spendings[this.selectedDate].length; i++) {
        if (this.spendings[this.selectedDate][i].uid == this.editingItem.uid) {
          this.spendings[this.selectedDate][i] = this.editingItem;
          break;
        }
      }
      this.editingItem = undefined;
    },
    getSpendingByDate(date) {
      return this.spendings[date] || [];
    },
    getCurrentDateTime() {
      const date = new Date().toLocaleDateString("en-CA");
      const time = new Date().toLocaleTimeString("en-CA", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      return { date, time };
    },
    getEditingItem() {
      return this.editingItem;
    },
  },
  watch: {},
});
