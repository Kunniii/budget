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
      "2023-07-24": [],
      "2023-07-25": [],
      "2023-07-26": [],
      "2023-07-27": [],
      "2023-07-28": [],
      "2023-07-29": [],
      "2023-07-30": [],
      "2023-07-31": [],
      "2023-08-01": [],
      "2023-08-02": [],
      "2023-08-03": [],
      "2023-08-04": [],
      "2023-08-05": [],
      "2023-08-06": [],
      "2023-08-07": [],
      "2023-08-08": [],
      "2023-08-09": [],
      "2023-08-10": [],
      "2023-08-11": [],
      "2023-08-12": [],
      "2023-07-24": [
        {
          uid: "e6e96c0e-4332-47af-a5e2-777d0e0c3b78",
          created: "15:10:23",
          type: 4,
          text: "Item 32",
          amount: 891,
        },
        {
          uid: "5d30edfb-0576-482d-82ce-cdcd39d7db0e",
          created: "15:10:25",
          type: 2,
          text: "Item 46",
          amount: 132,
        },
        {
          uid: "4511e2d6-21ca-40f3-ba77-97026e4c01bb",
          created: "15:10:26",
          type: 3,
          text: "Item 84",
          amount: 654,
        },
        {
          uid: "c0efb4aa-820a-4b09-8f8b-14a9a3191411",
          created: "15:10:28",
          type: 5,
          text: "Item 75",
          amount: 908,
        },
        {
          uid: "97502ca4-69d2-4873-8b8e-43727be8037b",
          created: "15:10:29",
          type: 1,
          text: "Item 9",
          amount: 289,
        },
      ],
      "2023-07-25": [
        {
          uid: "0a07e5b7-79e8-4b37-9b34-0a4a1195d0e6",
          created: "10:21:47",
          type: 5,
          text: "Item 92",
          amount: 398,
        },
        {
          uid: "f6e4570d-6462-408d-a2b2-37f71f25cfed",
          created: "10:21:49",
          type: 3,
          text: "Item 62",
          amount: 559,
        },
        {
          uid: "a234f2a5-c051-4d53-a7b3-1048aaf00a66",
          created: "10:21:50",
          type: 4,
          text: "Item 44",
          amount: 720,
        },
        {
          uid: "e107715c-bd6b-45dd-86c2-66f3842e44de",
          created: "10:21:52",
          type: 1,
          text: "Item 97",
          amount: 58,
        },
        {
          uid: "f0bcb618-5106-40db-af06-99ed98c031d3",
          created: "10:21:54",
          type: 3,
          text: "Item 39",
          amount: 892,
        },
      ],
      "2023-07-26": [
        {
          uid: "a4770c5d-0ff5-4f48-a79c-785e8806d7e7",
          created: "09:05:30",
          type: 3,
          text: "Item 57",
          amount: 421,
        },
        {
          uid: "8898a51b-1d1d-45c1-ba10-4a6a78f31a35",
          created: "09:05:32",
          type: 2,
          text: "Item 23",
          amount: 713,
        },
        {
          uid: "4b2d3904-4284-49f9-86d5-3a6c6307a8e6",
          created: "09:05:33",
          type: 4,
          text: "Item 15",
          amount: 78,
        },
        {
          uid: "4bd6b5f6-aa28-4511-b91e-602bf558f0e7",
          created: "09:05:35",
          type: 1,
          text: "Item 35",
          amount: 162,
        },
        {
          uid: "d2d62b99-7694-4aa9-a6b2-5d6eae9d0e2d",
          created: "09:05:36",
          type: 2,
          text: "Item 85",
          amount: 923,
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
