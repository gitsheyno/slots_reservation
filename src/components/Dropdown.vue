<script setup lang="ts">
/**
 * Custom Dropdown Component to limit the Slots based on category
 */
import { ref, computed, onMounted } from "vue";
import { type DropdownItems } from "../types";
import { onUnmounted } from "vue";

const props = defineProps<{
  options: { value: string; label: string }[];
  placeholder?: string;
}>();

const model = defineModel<DropdownItems>({ default: "all" });

const placeholder = props.placeholder || "select category";

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const handleSelectedLabel = computed(() => {
  if (!model.value) return placeholder;
  const option = props.options.find((item) => item.value === model.value);
  const result = option ? option.label : placeholder;

  return result;
});

const handleToggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleSelectOption = (option: DropdownItems) => {
  model.value = option;
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<template>
  <div ref="dropdownRef" class="relative">
    <button
      @click="handleToggleDropdown"
      type="button"
      class="flex items-center justify-between w-full bg-white border-2 border-indigo-300 hover:border-indigo-400 rounded-lg px-4 py-2.5 text-gray-700 font-medium leading-tight cursor-pointer shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <div class="flex items-center">
        <span>{{ handleSelectedLabel }}</span>
      </div>
      <svg
        class="h-5 w-5 text-indigo-600 ml-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        :class="{ 'transform rotate-180': isOpen }"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </button>

    <ul
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-60 overflow-auto focus:outline-none"
      tabindex="-1"
      role="listbox"
    >
      <li
        v-for="option in props.options"
        :key="option.value"
        class="px-4 py-2 flex items-center cursor-pointer hover:bg-indigo-50 transition duration-150 ease-in-out"
        role="option"
        @click="handleSelectOption(option.value as DropdownItems)"
      >
        <span class="block truncate font-medium">{{ option.label }}</span>
        <svg
          v-if="model === option.value"
          class="h-5 w-5 text-indigo-600 ml-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </li>
    </ul>
  </div>
</template>
