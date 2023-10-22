<script setup>
import { useBudgetStore } from "../store";

const store = useBudgetStore();

function getTypeText(id) {
  let item = store.spendTypes.find((item) => item.id == id);
  if (item) {
    return item.name;
  } else {
    return "NOT FOUND";
  }
}

function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + "...";
  }
}

function setEditItem(item) {
  store.editingItem = item;
}
</script>

<template>
  <div
    class="m-1 h-[65vh] overflow-y-scroll rounded-xl border-2 border-cyan-500 scrollbar bg-white"
  >
    <table class="w-full text-center select-none">
      <thead class="text-lg bg-cyan-500 text-white sticky top-0 z-10">
        <tr>
          <th class="sticky top-0 z-10"><i class="fa-solid fa-clock"></i></th>
          <th class="sticky top-0 z-10"><i class="fa-solid fa-layer-group"></i></th>
          <th class="sticky top-0 z-10"><i class="fa-solid fa-coins"></i></th>
          <th class="sticky top-0 z-10"><i class="fa-solid fa-note-sticky"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in store.getSpendingByDate(store.selectedDate)"
          :key="item.uid"
          class="hover:bg-slate-200"
          @click="setEditItem(item)"
        >
          <td>{{ item.createdAt }}</td>
          <td>{{ getTypeText(item.type) }}</td>
          <td>
            {{ new Intl.NumberFormat("en-US").format(item.amount * 1000) }}
          </td>
          <td>{{ truncateString(item.text, 10) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="py-2 bg-cyan-500 text-white flex justify-around font-bold text-center m-1 rounded-xl">
    <p>Total Spent</p>
    <p>{{ store.totalSpendingBySelectedDate }} <i class="fa-solid fa-coins"></i></p>
  </div>
</template>
