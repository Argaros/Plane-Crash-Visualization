import { ref, watch } from 'vue'

export function useDebouncedSlider(delay = 500) {
    const debouncedValue = ref(null)
    const isDebouncing = ref(false)
    let timeoutId = null

    const debounceChange = (newValue, callback) => {
        // Clear existing timeout
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        // Update the debounced value immediately for UI
        debouncedValue.value = newValue
        isDebouncing.value = true

        // Set new timeout
        timeoutId = setTimeout(() => {
            isDebouncing.value = false
            if (callback) {
                callback(newValue)
            }
        }, delay)
    }

    const cancelDebounce = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
        isDebouncing.value = false
    }

    return {
        debouncedValue,
        isDebouncing,
        debounceChange,
        cancelDebounce
    }
} 