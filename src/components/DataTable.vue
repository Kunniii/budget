<script setup>
import { useBudgetStore } from "../store";

const store = useBudgetStore();
const today = store.today;

function getTypeText(id) {
  let item = store.spendTypes.find((item) => item.id == id);
  if (item) {
    return item.name;
  } else {
    return "NOT FOUND";
  }
}

function totalSpendByDate(date) {
  const spendings = store.getSpendingByDate(date);
  let total = 0;
  spendings.forEach((item) => {
    total += item.amount;
  });
  return new Intl.NumberFormat("en-US").format(total * 1000);
}

function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + "...";
  }
}
</script>

<template>
  <div class="m-1 h-[70vh] overflow-y-scroll rounded-xl border-2 border-violet-700 scrollbar">
    <table class="border-collapse w-full text-center select-none">
      <colgroup>
        <col class="w-2" />
        <col class="w-2" />
        <col class="w-2" />
        <col class="w-2" />
      </colgroup>
      <thead class="text-lg bg-violet-700 text-white sticky">
        <tr>
          <th>Time</th>
          <th>Type</th>
          <th>VNĐ</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in store.spendings[store.selectedDate]"
          :key="item.uid"
          class="hover:bg-slate-200"
        >
          <td>{{ item.created }}</td>
          <td>{{ getTypeText(item.type) }}</td>
          <td>
            {{ new Intl.NumberFormat("en-US").format(item.amount * 1000) }}
          </td>
          <td>{{ truncateString(item.text, 10) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="bg-violet-700 text-white flex justify-around font-bold text-center m-1 rounded-xl">
    <p>Total</p>
    <p>{{ totalSpendByDate(today.date) }}</p>
  </div>
</template>
