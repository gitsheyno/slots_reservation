import { ref, onMounted } from "vue";
import { type SlotType } from "../types";
import { enrichSlots } from "../utilities/informationAdaptor";
import { grouping } from "../utilities/groupingAdaptor";
import { url } from "../constants/APIS";
/**
 * A composable funtion that gets the slots from a remote API
 * It injects additional info to slots like instructor and location
 * it groups the slot by date and time using adaptor function
 */
export const useGetSlots = () => {
  const data = ref<Record<string, SlotType[]>>({});
  const error = ref<string | null>(null);
  const loading = ref(true);

  const fetchSlots = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(url);
      const result: SlotType[] = await response.json();

      const enrichedslots = enrichSlots(result);
      const groupedSlots = grouping(enrichedslots);

      data.value = groupedSlots.value;
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchSlots();
  });

  return {
    data,
    error,
    loading,
  };
};
