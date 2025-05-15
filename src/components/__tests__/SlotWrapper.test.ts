import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SlotWrapper from "../SlotWrapper.vue";
describe("SlotWrapper", () => {
  it("recieves slots data correctly and pass down", () => {
    const wrapper = mount(SlotWrapper, {
      props: {
        slots: [
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
        ],
        searchTerm: "",
      },
    });

    expect(wrapper.vm.allSlots).toStrictEqual([
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
    ]);

    const slotComponent = wrapper.findComponent({ name: "Slot" });

    expect(slotComponent.props("slot")).toStrictEqual({
      capacity: {
        current_capacity: 7,
        max_capacity: 50,
      },
      category: "green",
      end_time: "2024-07-23T08:30:00",
      id: 1,
      start_time: "2024-07-23T08:00:00",
    });
  });

  it("filters slot correctly and pass down", async () => {
    const wrapper = mount(SlotWrapper, {
      props: {
        slots: [
          {
            id: 1,
            start_time: "2024-07-23T08:00:00",
            end_time: "2024-07-23T08:30:00",
            capacity: {
              current_capacity: 7,
              max_capacity: 50,
            },
            category: "green",
            location: "mainHal",
            instructor: "Johan",
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
            location: "101",
            instructor: "Shayan",
          },
        ],
        searchTerm: "",
      },
    });

    expect(wrapper.vm.allSlots).toStrictEqual([
      {
        id: 1,
        start_time: "2024-07-23T08:00:00",
        end_time: "2024-07-23T08:30:00",
        capacity: {
          current_capacity: 7,
          max_capacity: 50,
        },
        category: "green",
        location: "mainHal",
        instructor: "Johan",
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
        location: "101",
        instructor: "Shayan",
      },
    ]);

    await wrapper.setProps({ searchTerm: "shayan" });
    expect(wrapper.vm.filteredSlots).toStrictEqual([
      {
        id: 2,
        start_time: "2024-07-24T08:00:00",
        end_time: "2024-07-24T08:30:00",
        capacity: {
          current_capacity: 17,
          max_capacity: 50,
        },
        category: "red",
        location: "101",
        instructor: "Shayan",
      },
    ]);
  });

  it("updates slots based on new update event", async () => {
    const wrapper = mount(SlotWrapper, {
      props: {
        slots: [
          {
            id: 1,
            start_time: "2024-07-23T08:00:00",
            end_time: "2024-07-23T08:30:00",
            capacity: {
              current_capacity: 7,
              max_capacity: 50,
            },
            category: "green",
            location: "mainHal",
            instructor: "Johan",
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
            location: "101",
            instructor: "Shayan",
          },
        ],
        searchTerm: "",
      },
    });

    await wrapper.setProps({
      data: {
        id: 2,
        currentCapacity: 7,
        category: "green",
      },
    });

    expect(wrapper.vm.allSlots).toStrictEqual([
      {
        id: 1,
        start_time: "2024-07-23T08:00:00",
        end_time: "2024-07-23T08:30:00",
        capacity: {
          current_capacity: 7,
          max_capacity: 50,
        },
        category: "green",
        location: "mainHal",
        instructor: "Johan",
      },
      {
        id: 2,
        start_time: "2024-07-24T08:00:00",
        end_time: "2024-07-24T08:30:00",
        capacity: {
          current_capacity: 7,
          max_capacity: 50,
        },
        category: "green",
        location: "101",
        instructor: "Shayan",
      },
    ]);
  });

  it("limits the slots", () => {
    const wrapper = mount(SlotWrapper, {
      props: {
        slots: [
          {
            id: 1,
            start_time: "2024-07-23T08:00:00",
            end_time: "2024-07-23T08:30:00",
            capacity: {
              current_capacity: 7,
              max_capacity: 50,
            },
            category: "green",
            location: "mainHal",
            instructor: "Johan",
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
            location: "101",
            instructor: "Shayan",
          },
        ],
        searchTerm: "",
        limit: "green",
      },
    });

    expect(wrapper.vm.limitedSlots).toStrictEqual([
      {
        id: 1,
        start_time: "2024-07-23T08:00:00",
        end_time: "2024-07-23T08:30:00",
        capacity: { current_capacity: 7, max_capacity: 50 },
        category: "green",
        location: "mainHal",
        instructor: "Johan",
      },
    ]);
  });
});
