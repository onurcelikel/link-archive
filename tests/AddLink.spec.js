import Vue from "vue";
import { mount } from "@vue/test-utils";
import AddLink from "../src/views/AddLink";
import SnackBar from "../src/components/SnackBar";

//Bu Testi Tamamlayamadım.

describe("AddLink.vue", () => {
  it("should calculate the active page", async () => {
    const wrapper = mount(AddLink);
    const linkName = wrapper.classes("link-name");
    await linkName.setValue("test");
    const linkUrl = wrapper.classes("link-url");
    await linkUrl.setValue("www.test.com");

    const button = wrapper.classes("save");
    button.trigger("click");

    await Vue.nextTick();
    const snack = wrapper.findComponent(SnackBar);
    expect(snack.exists()).toBe(true);
  });
});
