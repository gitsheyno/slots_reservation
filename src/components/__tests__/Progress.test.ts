// CapacityBar.test.ts - Unit Tests
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CapacityBar from "../Progress.vue";

describe("CapacityBar", () => {
  describe("handleCapacityBackground computed property", () => {
    it("returns correct background class based on currentCategory", () => {
      const wrapper = mount(CapacityBar, {
        props: {
          percentage: 50,
          currentCategory: "red",
        },
      });
      expect(wrapper.vm.handleCapacityBackground).toBe("bg-red-500");
    });
  });

  describe("CapacityBar component rendering", () => {
    it("renders with correct width based on percentage prop", () => {
      const wrapper = mount(CapacityBar, {
        props: {
          percentage: 75,
          currentCategory: "green",
        },
      });

      const capacityDiv = wrapper.find("div");
      expect(capacityDiv.attributes("style")).toContain("width: 75%");
    });

    it("applies correct background class based on currentCategory", () => {
      const wrapper = mount(CapacityBar, {
        props: {
          percentage: 25,
          currentCategory: "yellow",
        },
      });

      const capacityDiv = wrapper.find("div");
      expect(capacityDiv.classes()).toContain("bg-amber-200");
    });

    it("applies transition classes for animation", () => {
      const wrapper = mount(CapacityBar, {
        props: {
          percentage: 50,
          currentCategory: "green",
        },
      });

      const capacityDiv = wrapper.find("div");
      expect(capacityDiv.classes()).toContain("transition-all");
      expect(capacityDiv.classes()).toContain("duration-500");
      expect(capacityDiv.classes()).toContain("ease-out");
    });
  });

  describe("CapacityBar reactivity", () => {
    it("updates width when percentage prop changes", async () => {
      const wrapper = mount(CapacityBar, {
        props: {
          percentage: 30,
          currentCategory: "green",
        },
      });

      expect(wrapper.find("div").attributes("style")).toContain("width: 30%");

      await wrapper.setProps({ percentage: 60 });
      expect(wrapper.find("div").attributes("style")).toContain("width: 60%");
    });

    it("updates background class when currentCategory prop changes", async () => {
      const wrapper = mount(CapacityBar, {
        props: {
          percentage: 50,
          currentCategory: "green",
        },
      });
      console.log(wrapper.find("div").classes());

      expect(wrapper.find("div").classes()).toContain("bg-emerald-200");

      await wrapper.setProps({ currentCategory: "red" });
      expect(wrapper.find("div").classes()).toContain("bg-red-500");
    });
  });

  describe("CapacityBar edge cases", () => {
    it("handles 0% correctly", () => {
      const wrapper = mount(CapacityBar, {
        props: {
          percentage: 0,
          currentCategory: "green",
        },
      });

      expect(wrapper.find("div").attributes("style")).toContain("width: 0%");
    });

    it("handles 100% correctly", () => {
      const wrapper = mount(CapacityBar, {
        props: {
          percentage: 100,
          currentCategory: "green",
        },
      });

      expect(wrapper.find("div").attributes("style")).toContain("width: 100%");
    });
  });
});
