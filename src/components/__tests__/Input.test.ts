import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SearchInput from "../Input.vue";

describe("SearchInput", () => {
  it("updates the model value when input changes", async () => {
    const wrapper = mount(SearchInput, {
      global: {
        config: {
          compilerOptions: {
            isCustomElement: (tag) => tag === "model",
          },
        },
      },
    });

    const input = wrapper.find("input");

    await input.setValue("CONROO");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["CONROO"]);
  });

  it("clears the input when the clear button is clicked", async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: "Shayan",
      },
    });

    const input = wrapper.find("input");
    expect(input.element.value).toBe("Shayan");

    const clearButton = wrapper.find("button");
    expect(clearButton.exists()).toBe(true);

    await clearButton.trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([""]);
  });
});
