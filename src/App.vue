<script setup>
import InputData from "./components/InputData.vue";
import DataTable from "./components/DataTable.vue";
import { useBudgetStore } from "./store";
import DateSelectBar from "./components/DateSelectBar.vue";
useBudgetStore().loadLocalStorage();
</script>

<template>
  <DateSelectBar></DateSelectBar>
  <DataTable></DataTable>
  <InputData></InputData>
</template>

<style scoped></style>
