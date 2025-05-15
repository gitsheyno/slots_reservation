export interface SlotType {
  id: number;
  start_time: string;
  end_time: string;
  category: string;
  capacity: {
    current_capacity: number;
    max_capacity: number;
  };
  location?: string;
  instructor?: string;
  description?: string;
}
