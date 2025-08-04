<template>
  <div class="year-range-slider">
    <!-- Header with labels -->
    <div class="slider-header">
      <label v-if="label" class="slider-label">{{ label }}</label>
      <div class="slider-values">
        <span class="value-display">{{ formatValue(modelValue.start) }}</span>
        <span class="separator">-</span>
        <span class="value-display">{{ formatValue(modelValue.end) }}</span>
      </div>
    </div>

    <!-- Slider container -->
    <div
      class="slider-container"
      :style="{
        '--range-start': ((modelValue.start - min) / (max - min)) * 100,
        '--range-end': ((modelValue.end - min) / (max - min)) * 100,
        '--slider-color': sliderColor,
        '--slider-hover-color': sliderHoverColor,
      }"
    >
      <!-- Track background -->
      <div class="slider-track"></div>

      <!-- Active range indicator -->
      <div class="slider-range"></div>

      <!-- Min slider -->
      <input
        ref="minSlider"
        type="range"
        class="slider-input slider-min"
        :min="min"
        :max="max"
        :value="modelValue.start"
        :step="step"
        @input="updateStart"
        @focus="bringToFront('min')"
        @mousedown="bringToFront('min')"
        @touchstart="bringToFront('min')"
      />

      <!-- Max slider -->
      <input
        ref="maxSlider"
        type="range"
        class="slider-input slider-max"
        :min="min"
        :max="max"
        :value="modelValue.end"
        :step="step"
        @input="updateEnd"
        @focus="bringToFront('max')"
        @mousedown="bringToFront('max')"
        @touchstart="bringToFront('max')"
      />

      <!-- Thumb indicators -->
      <div
        class="slider-thumb slider-thumb-min"
        :style="{ left: ((modelValue.start - min) / (max - min)) * 100 + '%' }"
      >
        <div class="thumb-tooltip">{{ formatValue(modelValue.start) }}</div>
      </div>
      <div
        class="slider-thumb slider-thumb-max"
        :style="{ left: ((modelValue.end - min) / (max - min)) * 100 + '%' }"
      >
        <div class="thumb-tooltip">{{ formatValue(modelValue.end) }}</div>
      </div>
    </div>

    <!-- Optional: Show min/max labels -->
    <div v-if="showMinMaxLabels" class="slider-limits">
      <span class="limit-label">{{ formatValue(min) }}</span>
      <span class="limit-label">{{ formatValue(max) }}</span>
    </div>
  </div>
</template>

<script setup>
import {
  defineEmits,
  defineProps,
  ref,
  nextTick,
  computed,
  onUnmounted,
} from "vue";
import { useDebouncedSlider } from "../composables/useDebouncedSlider.js";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value &&
        typeof value.start !== "undefined" &&
        typeof value.end !== "undefined"
      );
    },
  },
  min: {
    type: [Number, String],
    default: 0,
  },
  max: {
    type: [Number, String],
    default: 100,
  },
  step: {
    type: [Number, String],
    default: 1,
  },
  label: {
    type: String,
    default: "",
  },
  showMinMaxLabels: {
    type: Boolean,
    default: false,
  },
  sliderColor: {
    type: String,
    default: "#007bff",
  },
  sliderHoverColor: {
    type: String,
    default: "#0056b3",
  },
  formatFunction: {
    type: Function,
    default: null,
  },
  debounceDelay: {
    type: Number,
    default: 500,
  },
});

const emit = defineEmits(["update:modelValue", "change", "debouncedChange"]);

const minSlider = ref(null);
const maxSlider = ref(null);

// Setup debounced slider
const { debouncedValue, isDebouncing, debounceChange, cancelDebounce } =
  useDebouncedSlider(props.debounceDelay);

// Format value for display
const formatValue = (value) => {
  if (props.formatFunction) {
    return props.formatFunction(value);
  }
  return value;
};

// Bring slider to front when interacting
const bringToFront = async (slider) => {
  await nextTick();

  const container = document.querySelector(".slider-container");
  if (!container) return;

  const minInput = container.querySelector(".slider-min");
  const maxInput = container.querySelector(".slider-max");

  if (slider === "min") {
    minInput.style.zIndex = "4";
    maxInput.style.zIndex = "3";
  } else {
    maxInput.style.zIndex = "4";
    minInput.style.zIndex = "3";
  }
};

// Update start value
const updateStart = (event) => {
  const start = parseInt(event.target.value);
  let end = parseInt(props.modelValue.end);

  // Ensure start doesn't exceed end
  if (start > end) {
    end = start;
  }

  const newValue = { start, end };
  emit("update:modelValue", newValue);
  emit("change", newValue);

  // Debounce the change for API calls
  debounceChange(newValue, (debouncedValue) => {
    emit("debouncedChange", debouncedValue);
  });
};

// Update end value
const updateEnd = (event) => {
  const end = parseInt(event.target.value);
  let start = parseInt(props.modelValue.start);

  // Ensure end doesn't go below start
  if (end < start) {
    start = end;
  }

  const newValue = { start, end };
  emit("update:modelValue", newValue);
  emit("change", newValue);

  // Debounce the change for API calls
  debounceChange(newValue, (debouncedValue) => {
    emit("debouncedChange", debouncedValue);
  });
};

// Cleanup on unmount
onUnmounted(() => {
  cancelDebounce();
});
</script>

<style scoped>
.year-range-slider {
  width: 100%;
  margin: 1rem 0;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.slider-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #495057;
  margin: 0;
}

.slider-values {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--slider-color, #007bff);
}

.value-display {
  background: rgba(0, 123, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  min-width: 2.5rem;
  text-align: center;
}

.separator {
  color: #6c757d;
  font-weight: 400;
}

.slider-container {
  position: relative;
  height: 32px;
  margin: 0.5rem 0;
}

.slider-track {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  transform: translateY(-50%);
  z-index: 1;
}

.slider-range {
  position: absolute;
  top: 50%;
  height: 8px;
  background: var(--slider-color, #007bff);
  border-radius: 4px;
  transform: translateY(-50%);
  z-index: 1;
  left: calc(var(--range-start, 0) * 1%);
  width: calc((var(--range-end, 100) - var(--range-start, 0)) * 1%);
  transition: all 0.2s ease;
}

.slider-input {
  position: absolute;
  width: 100%;
  height: 32px;
  top: 0;
  left: 0;
  appearance: none;
  background: transparent;
  pointer-events: none;
  z-index: 2;
}

.slider-input.slider-min {
  z-index: 2;
}

.slider-input.slider-max {
  z-index: 3;
}

.slider-input:focus {
  z-index: 4;
}

/* Webkit slider styles */
.slider-input::-webkit-slider-thumb {
  appearance: none;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  pointer-events: all;
  border: 2px solid transparent;
  box-shadow: none;
  transition: all 0.2s ease;
}

.slider-input::-webkit-slider-thumb:hover {
  background: transparent;
  transform: none;
  box-shadow: none;
}

.slider-input::-webkit-slider-thumb:active {
  transform: none;
  box-shadow: none;
}

.slider-input::-webkit-slider-track {
  appearance: none;
  background: transparent;
}

/* Firefox slider styles */
.slider-input::-moz-range-thumb {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  pointer-events: all;
  border: 2px solid transparent;
  box-shadow: none;
  transition: all 0.2s ease;
}

.slider-input::-moz-range-thumb:hover {
  background: transparent;
  transform: none;
  box-shadow: none;
}

.slider-input::-moz-range-thumb:active {
  transform: none;
  box-shadow: none;
}

.slider-input::-moz-range-track {
  background: transparent;
}

/* Custom thumb indicators */
.slider-thumb {
  position: absolute;
  top: 50%;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--slider-color, #007bff);
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transform: translate(-50%, -50%);
  z-index: 5;
  transition: all 0.2s ease;
  pointer-events: none;
}

.slider-thumb:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.thumb-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #343a40;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
  margin-bottom: 0.5rem;
}

.thumb-tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: #343a40;
}

.slider-thumb:hover .thumb-tooltip {
  opacity: 1;
}

.slider-limits {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.limit-label {
  font-size: 0.75rem;
  color: #6c757d;
  font-weight: 500;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .slider-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .slider-values {
    align-self: flex-end;
  }

  .slider-thumb {
    width: 20px;
    height: 20px;
  }

  .slider-input::-webkit-slider-thumb,
  .slider-input::-moz-range-thumb {
    height: 20px;
    width: 20px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .slider-track {
    background: #495057;
  }

  .slider-label {
    color: #e9ecef;
  }

  .limit-label {
    color: #adb5bd;
  }

  .thumb-tooltip {
    background: #212529;
  }

  .thumb-tooltip::after {
    border-top-color: #212529;
  }
}
</style>
