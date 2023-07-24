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
    spendings: {},
  }),
  getters: {
    todaySpending(state) {
      let today = this.today;
      return state.spendings[today.date];
    },
    today(state) {
      const date = new Date().toLocaleDateString("en-CA");
      const time = new Date().toLocaleTimeString("en-CA", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      return { date, time };
    },
  },
  actions: {
    loadLocalStorage() {
      let rawData = localStorage.getItem("spendings");
      if (rawData) {
        this.spendings = JSON.parse(rawData);
      }
    },
    addSpending(spending) {
      const today = this.today;
      const uid = uuid();

      if (!this.spendings[today.date]) {
        this.spendings[today.date] = [];
      }

      this.spendings[today.date].unshift({
        uid: uid,
        created: today.time,
        type: spending.type,
        text: spending.text,
        amount: spending.amount,
      });
    },
    removeSpending(uid) {},
    editSpending(uid) {},
  },
  watch: {},
});
