<template>
  <div class="map-controls">
    <div class="card">
      <div class="card-body p-4">
        <h6 class="card-title mb-4">Map Filters</h6>

        <div class="mb-4">
          <DualRangeSlider
            label="Year Range"
            :min="filterConfig.YEAR_RANGE.MIN"
            :max="filterConfig.YEAR_RANGE.MAX"
            v-model="filters.yearRange"
            slider-color="#007bff"
            slider-hover-color="#0056b3"
            :debounce-delay="500"
            @debounced-change="handleDebouncedChange"
          />
        </div>

        <div class="mb-4">
          <DualRangeSlider
            label="Fatalities Range"
            :min="filterConfig.FATALITIES_RANGE.MIN"
            :max="filterConfig.FATALITIES_RANGE.MAX"
            v-model="filters.fatalitiesRange"
            slider-color="#dc3545"
            slider-hover-color="#c82333"
            :debounce-delay="500"
            @debounced-change="handleDebouncedChange"
          />
        </div>

        <div class="mb-4">
          <label class="form-label small">Operator</label>
          <select
            class="form-select form-select-sm"
            :value="filters.operator"
            @change="updateFilter('operator', $event.target.value)"
          >
            <option value="">All Operators</option>
            <option
              v-for="operator in operators"
              :key="operator"
              :value="operator"
            >
              {{ operator }}
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="form-label small">Manufacturer</label>
          <select
            class="form-select form-select-sm"
            :value="filters.manufacturer"
            @change="updateFilter('manufacturer', $event.target.value)"
          >
            <option value="">All Manufacturers</option>
            <option
              v-for="manufacturer in manufacturers"
              :key="manufacturer"
              :value="manufacturer"
            >
              {{ manufacturer }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import { FILTER_CONFIG, createFilterConfig } from "../constants/index.js";
import DualRangeSlider from "./DualRangeSlider.vue";

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
  operators: {
    type: Array,
    default: () => [],
  },
  manufacturers: {
    type: Array,
    default: () => [],
  },
  statistics: {
    type: Object,
    default: () => null,
  },
});

const emit = defineEmits(["update:filters", "debounced-filter-change"]);

// Create dynamic filter config based on statistics, fallback to static config
const filterConfig = computed(() => {
  return props.statistics
    ? createFilterConfig(props.statistics)
    : FILTER_CONFIG;
});

const updateFilter = (key, value) => {
  emit("update:filters", {
    ...props.filters,
    [key]: value,
  });
};

const handleDebouncedChange = (newValue) => {
  emit("debounced-filter-change", newValue);
};
</script>

<style scoped>
.map-controls {
  position: absolute;
  top: 80px;
  left: 20px;
  z-index: 1060;
  width: 300px;
}

.card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: none;
}
</style>
