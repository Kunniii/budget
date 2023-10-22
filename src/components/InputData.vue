<script setup>
import { ref, watch } from "vue";
import { useBudgetStore } from "../store";

const store = useBudgetStore();

const spending = ref({ type: store.defaultSpendType, text: "", amount: "" });

watch(
  store.spendings,
  (newValue, oldValue) => {
    localStorage.setItem("spendings", JSON.stringify(newValue));
  },
  { deep: true }
);

function addSpending() {
  if (spending.value.amount != "") {
    store.addSpending(spending.value);
    spending.value.text = "";
    spending.value.amount = "";
  }
}
</script>

<template>
  <div class="flex justify-center">
    <div>
      <div class="grid w-full grid-cols-5 gap-2 rounded-xl bg-slate-200 p-1">
        <div
          v-for="option in store.spendTypes"
          class="text-center"
        >
          <input
            type="radio"
            :id="option.id"
            :value="option.id"
            :checked="option.id == store.defaultSpendType"
            v-model="spending.type"
            class="peer hidden"
          />
          <label
            :for="option.id"
            class="font-bold block cursor-pointer select-none rounded-xl py-1 px-3 text-center peer-checked:bg-cyan-500 peer-checked:text-white text-slate-900"
            >{{ option.name }}</label
          >
        </div>
      </div>
      <div class="px-1 bg-slate-200 rounded-xl mt-1">
        <input
          name="number"
          type="number"
          placeholder="x1000 VNĐ"
          class="rounded-xl w-full outline-dashed outline-2 outline-violet-300 focus:outline-cyan-500 focus:outline py-1 px-2 duration-300 my-1"
          @keydown="
            (e) => {
              if (e.key == 'Enter') addSpending();
            }
          "
          v-model="spending.amount"
        />
        <input
          name="note"
          type="text"
          placeholder="Note..."
          class="rounded-xl w-full outline-dashed outline-2 outline-violet-300 focus:outline-cyan-500 focus:outline py-1 px-2 duration-300 my-1"
          @keydown="
            (e) => {
              if (e.key == 'Enter') addSpending();
            }
          "
          v-model="spending.text"
        />
      </div>
      <button
        @click="addSpending"
        class="py-1 my-1 w-full text-cyan-500 border-2 border-cyan-500 rounded-xl duration-300 hover:bg-cyan-500 hover:text-white"
      >
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>
