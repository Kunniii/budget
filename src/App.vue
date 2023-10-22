<script setup>
import InputData from "./components/InputData.vue";
import DataTable from "./components/DataTable.vue";
import { useBudgetStore } from "./store";
import DateSelectBar from "./components/DateSelectBar.vue";
import DetailsPopup from "./components/DetailsPopup.vue";
useBudgetStore().loadLocalStorage();
</script>

<template>
  <DetailsPopup></DetailsPopup>
  <span
    class="duration-100 ease-in-out"
    :class="useBudgetStore().editingItem != undefined ? 'blur-sm' : ''"
  >
    <DateSelectBar></DateSelectBar>
    <DataTable></DataTable>
    <InputData></InputData>
  </span>
</template>

<style scoped></style>
