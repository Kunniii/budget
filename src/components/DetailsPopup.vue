<script setup>
import { useBudgetStore } from "../store";
import { ref } from "vue";

const selectedType = ref("");

const store = useBudgetStore();
</script>

<template>
  <div
    v-if="store.editingItem != undefined"
    class="bg-black bg-opacity-50 fixed z-20 w-screen h-screen top-0 duration-200 ease-in-out select-none"
  >
    <div class="z-30 w-96 mx-auto bg-white shadow-lg rounded-xl overflow-hidden relative top-24">
      <!-- Close Button -->
      <button
        class="absolute top-2 right-2 px-3 py-1 bg-gray-200 text-gray-600 rounded-xl hover:bg-gray-300"
        @click="store.editingItem = undefined"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="p-4">
        <h2 class="text-xl font-semibold text-gray-800">Details</h2>
      </div>
      <div class="p-4">
        <label class="block text-sm font-medium text-gray-600">Type</label>
        <div class="flex mt-3">
          <div
            v-for="option in store.spendTypes"
            class="text-center"
          >
            <input
              type="radio"
              :id="option.id"
              :value="option.id"
              :checked="option.id == store.editingItem.type"
              v-model="store.editingItem.type"
              class="peer hidden"
            />
            <label
              :for="option.id"
              class="font-bold block cursor-pointer select-none rounded-xl py-1 px-3 text-center peer-checked:bg-cyan-500 peer-checked:text-white"
              >{{ option.name }}</label
            >
          </div>
        </div>
      </div>
      <div class="p-4">
        <label class="block text-sm font-medium text-gray-600">VNĐ</label>
        <input
          type="number"
          placeholder="x1000 VNĐ"
          class="rounded-xl w-full outline-dashed outline-2 outline-violet-300 focus:outline-cyan-500 focus:outline py-1 px-2 duration-300 my-1"
          v-model="store.editingItem.amount"
        />
      </div>
      <div class="p-4">
        <label class="block text-sm font-medium text-gray-600">Note</label>
        <textarea
          type="text"
          placeholder="Note..."
          class="scrollbar rounded-xl w-full outline-dashed outline-2 outline-violet-300 focus:outline-cyan-500 focus:outline py-1 px-2 duration-300 my-1"
          v-model="store.editingItem.text"
        ></textarea>
      </div>
      <div class="flex justify-around p-4">
        <button
          class="w-32 px-4 py-2 bg-red-400 font-bold text-white rounded-xl hover:bg-red-500"
          @click="store.deleteSpending()"
        >
          <i class="fa-solid fa-trash"></i>
          | Delete
        </button>
      </div>
    </div>
  </div>
</template>
