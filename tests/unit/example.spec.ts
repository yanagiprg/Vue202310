import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const props = { msg: "new message" };
    const wrapper = shallowMount(HelloWorld, {
      props,
    });
    expect(wrapper.text()).toMatch(props.msg);
  });
});
