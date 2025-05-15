import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CapacityWrapper from "../CapacityWrapper.vue";

describe("CapacityWrapper", () => {
  it("renders capacity values correctly", () => {
    const wrapper = mount(CapacityWrapper, {
      props: {
        capacity: 40,
        maxCapacity: 50,
        currentCategory: "green",
      },
    });

    const capacityText = wrapper.find(".rounded-md").text();
    expect(capacityText).toContain("40 / 50");
  });

  it("calculates percentage correctly", () => {
    const wrapper = mount(CapacityWrapper, {
      props: {
        capacity: 40,
        maxCapacity: 50,
        currentCategory: "green",
      },
    });

    expect(wrapper.vm.handleCapacityProgress).toBe(80);
  });

  it("handles decimal values correctly", () => {
    const wrapper = mount(CapacityWrapper, {
      props: {
        capacity: 33,
        maxCapacity: 50,
        currentCategory: "green",
      },
    });

    expect(wrapper.vm.handleCapacityProgress).toBe(66);
  });

  it("updates capacity display with new data", async () => {
    const wrapper = mount(CapacityWrapper, {
      props: {
        capacity: 40,
        maxCapacity: 50,
        currentCategory: "green",
      },
    });

    expect(wrapper.vm.handleCapacityProgress).toBe(80);

    await wrapper.setProps({ capacity: 30 });

    expect(wrapper.vm.handleCapacityProgress).toBe(60);
  });

  it("passes correct data to Prgress", () => {
    const wrapper = mount(CapacityWrapper, {
      props: {
        capacity: 40,
        maxCapacity: 50,
        currentCategory: "green",
      },
    });

    const progressComponent = wrapper.findComponent({ name: "Progress" });
    expect(progressComponent.props("currentCategory")).toBe("green");
  });
});
