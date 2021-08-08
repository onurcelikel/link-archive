import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import Pagination from "../src/components/Pagination";

describe("Pagination.vue", () => {
  it("should calculate the active page", async () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        total: 15,
        perPage: 5,
        active: 2,
      },
    });
    await Vue.nextTick();
    const activeLi = wrapper.findAll("li").at(wrapper.vm.active - 1);
    expect(activeLi.classes("active")).toBe(true);
  });

  it("should calculate the page count", async () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        total: 15,
        perPage: 5,
        active: 1,
      },
    });
    await Vue.nextTick();
    const pageCount = Math.floor(wrapper.vm.total / wrapper.vm.perPage);
    const liCount = wrapper.findAll("li").length;
    expect(liCount).toBe(pageCount);
  });
});
