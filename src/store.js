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
    spendings: {
      "2023-08-10": [
        {
          uid: "f193edba-4d70-4bb7-b055-b241ed2297d6",
          created: "11:44:01",
          type: 2,
          text: "",
          amount: 346,
        },
        {
          uid: "194e2fe2-2be6-497a-b306-0cf904a44d17",
          created: "11:44:01",
          type: 2,
          text: "Kunix mua gà",
          amount: 50,
        },
      ],
      "2023-08-11": [
        {
          uid: "f193edba-4d70-4bb7-b055-b241ed2297d6",
          created: "11:44:01",
          type: 2,
          text: "",
          amount: 34,
        },
        {
          uid: "194e2fe2-2be6-497a-b306-0cf904a44d17",
          created: "11:44:01",
          type: 2,
          text: "Kunix mua gà",
          amount: 50,
        },
      ],
      "2023-08-12": [
        {
          uid: "f193edba-4d70-4bb7-b055-b241ed2297d6",
          created: "11:44:01",
          type: 2,
          text: "",
          amount: 2,
        },
        {
          uid: "194e2fe2-2be6-497a-b306-0cf904a44d17",
          created: "11:44:01",
          type: 2,
          text: "Kunix mua gà",
          amount: 50,
        },
      ],
      "2023-08-13": [
        {
          uid: "f193edba-4d70-4bb7-b055-b241ed2297d6",
          created: "11:44:01",
          type: 2,
          text: "",
          amount: 1223450,
        },
        {
          uid: "194e2fe2-2be6-497a-b306-0cf904a44d17",
          created: "11:44:01",
          type: 2,
          text: "Kunix mua gà",
          amount: 50,
        },
      ],
      "2023-08-14": [
        {
          uid: "f193edba-4d70-4bb7-b055-b241ed2297d6",
          created: "11:44:01",
          type: 2,
          text: "",
          amount: 234,
        },
        {
          uid: "194e2fe2-2be6-497a-b306-0cf904a44d17",
          created: "11:44:01",
          type: 2,
          text: "Kunix mua gà",
          amount: 50,
        },
      ],
      "2023-08-15": [
        {
          uid: "f193edba-4d70-4bb7-b055-b241ed2297d6",
          created: "11:44:01",
          type: 2,
          text: "",
          amount: 2345,
        },
        {
          uid: "194e2fe2-2be6-497a-b306-0cf904a44d17",
          created: "11:44:01",
          type: 2,
          text: "Kunix mua gà",
          amount: 50,
        },
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
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      return { date, time };
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
      if (!Object.keys(this.spendings).includes(this.today.date)) {
        this.spendings[this.today.date] = [];
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
    getSpendingByDate(date) {
      return this.spendings[date] || [];
    },
  },
  watch: {},
});
