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
    spendings: {
      "2023-07-25": [
        { uid: "qvddv", type: 1, text: "Item 1", amount: 520, created: "09:00" },
        { uid: "1d2ae", type: 2, text: "Item 2", amount: 1200, created: "10:30" },
        { uid: "fdqvd", type: 3, text: "Item 3", amount: 11, created: "12:15" },
        { uid: "1243d", type: 4, text: "Item 4", amount: 30, created: "14:45" },
        { uid: "1adrs", type: 5, text: "Item 5", amount: 63, created: "16:20" },
        { uid: "qwddf", type: 3, text: "Item 6", amount: 75, created: "17:50" },
        { uid: "3ad4r", type: 2, text: "Item 7", amount: 42, created: "19:30" },
        { uid: "gwder", type: 1, text: "Item 8", amount: 19, created: "21:10" },
        { uid: "3gad4", type: 2, text: "Item 9", amount: 88, created: "22:40" },
        { uid: "w5ayu", type: 4, text: "Item 10", amount: 10, created: "23:59" },
      ],
    },
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
