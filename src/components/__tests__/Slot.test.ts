// SlotCard.test.ts - Simplified Tests
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { format } from "date-fns";
import SlotCard from "../Slot.vue";

const mockSlot = {
  id: 123,
  category: "available",
  start_time: "2025-05-15T10:00:00",
  end_time: "2025-05-15T11:30:00",
  location: "Gym Room 3",
  instructor: "John Smith",
  capacity: {
    current_capacity: 15,
    max_capacity: 25,
  },
};

describe("SlotCard", () => {
  it("renders slot information correctly", () => {
    const wrapper = mount(SlotCard, {
      props: {
        slot: mockSlot,
      },
    });

    expect(wrapper.text()).toContain("Gym Room 3");
    expect(wrapper.text()).toContain("John Smith");
    expect(wrapper.text()).toContain(123);
  });

  it("formats time correctly", () => {
    const wrapper = mount(SlotCard, {
      props: {
        slot: mockSlot,
      },
    });
    const startTime = "2025-05-15T10:00:00";
    const endTime = "2025-05-15T11:30:00";
    const expected = `${format(new Date(startTime), "h:mm a")} - ${format(
      new Date(endTime),
      "h:mm a"
    )}`;

    expect(wrapper.vm.handleFormatTimeRange(startTime, endTime)).toBe(expected);
  });

  it("gets correct border style from handleColor utility", () => {
    const wrapper = mount(SlotCard, {
      props: {
        slot: mockSlot,
      },
    });

    expect(wrapper.vm.handleBorderStyle).toBe("border-emerald-200");
  });

  it("passes correct props to CapacityWrapper", () => {
    const wrapper = mount(SlotCard, {
      props: {
        slot: mockSlot,
      },
    });

    const capacityWrapper = wrapper.findComponent({ name: "CapacityWrapper" });
    expect(capacityWrapper.props("capacity")).toBe(15);
    expect(capacityWrapper.props("maxCapacity")).toBe(25);
    expect(capacityWrapper.props("currentCategory")).toBe("available");
  });
});
