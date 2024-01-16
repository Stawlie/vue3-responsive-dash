import { DashboardLayout } from "@/components/types";
import { ref } from "vue";

function useDashboard(layouts: DashboardLayout[]) {
  const layoutList = ref(layouts);

  return {
    layouts: layoutList,
  };
}

export default useDashboard;