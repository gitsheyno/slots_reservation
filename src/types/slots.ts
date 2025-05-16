export interface SlotType {
  id: number;
  start_time: string;
  end_time: string;
  category: "green" | "red" | "yellow";
  capacity: {
    current_capacity: number;
    max_capacity: number;
  };
  location?: string;
  instructor?: string;
}
