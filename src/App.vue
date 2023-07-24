<script setup>
import InputData from "./components/InputData.vue";
import DataTable from "./components/DataTable.vue";
import { useBudgetStore } from "./store";
useBudgetStore().loadLocalStorage();
</script>

<template>
  <DataTable></DataTable>
  <InputData></InputData>
</template>

<style scoped></style>
