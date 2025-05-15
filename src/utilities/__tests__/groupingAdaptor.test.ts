import { describe, it, expect } from "vitest";
import { grouping } from "../groupingAdaptor";
import { type SlotType } from "../../types";
const slots: SlotType[] = [
  {
    id: 1,
    start_time: "2024-07-23T08:00:00",
    end_time: "2024-07-23T08:30:00",
    capacity: {
      current_capacity: 7,
      max_capacity: 50,
    },
    category: "green",
  },
  {
    id: 2,
    start_time: "2024-07-24T08:00:00",
    end_time: "2024-07-24T08:30:00",
    capacity: {
      current_capacity: 17,
      max_capacity: 50,
    },
    category: "red",
  },
];

describe("grouping function", () => {
  it("groups slots by the date", () => {
    const res = grouping(slots);
    expect(Object.keys(res.value)).toStrictEqual(["2024-07-23", "2024-07-24"]);
  });

  it("sorts by the time", () => {
    slots.push({
      id: 4,
      start_time: "2024-07-23T07:00:00",
      end_time: "2024-07-23T07:30:00",
      capacity: {
        current_capacity: 10,
        max_capacity: 40,
      },
      category: "yellow",
    });

    const res = grouping(slots);
    const sortedByTime = res.value["2024-07-23"];

    const sortedIds = sortedByTime.map((item) => item.id);

    expect(sortedIds).toEqual([4, 1]);
  });
});
