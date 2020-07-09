/**
 *
 */
import { mount, shallowMount } from "@vue/test-utils";
import { expect } from "chai";
import { setup } from "../src";

// the beautify should be handled by matchsnapshot code
// expect(beautify(wrapper.html())).toMatchSnapshot(this);

function MyVueComponent() {
    return {
        template: `<div>
            <span>Lorem Ipsum dolor</span>
        </div>
        `,
    };
}

function MyVueComponentWithMethods() {
    return {
        template: `<div>
            <span class="count">{{ count }}</span>
            <button @click="increment">Increment</button>
        </div>
        `,
        data() {
            return {
                count: 0,
            };
        },
        methods: {
            increment() {
                this.count++;
            },
        },
    };
}

function MyVueComponentWithParams() {
    return {
        template: `<div>
            <i>{{ message }}</i>
        </div>
        `,
        props: {
            message: String,
        },
    };
}

describe("matchSnapshot", () => {
    it("should match a mounted vue component", () => {
        const wrapper = mount(MyVueComponent());

        expect(wrapper).to.matchSnapshot();
    });
    it("should match a shallow mounted vue component", () => {
        const wrapper = shallowMount(MyVueComponent());

        expect(wrapper).to.matchSnapshot();
    });
    it("should match a mutated vue component", async () => {
        const wrapper = mount(MyVueComponentWithMethods());
        expect(wrapper).to.matchSnapshot(); // non-mutated

        wrapper.vm.increment();
        await wrapper.vm.$nextTick();
        expect(wrapper).to.matchSnapshot(); // mutated to 1

        wrapper.vm.increment();
        await wrapper.vm.$nextTick();
        expect(wrapper).to.matchSnapshot(); // mutated to 2
    });

    it("should match snapshots with double quotes", () => {
        const wrapper = shallowMount(MyVueComponentWithParams(), {
            propsData: {
                message: 'program: "Hello World!"',
            },
        });
        expect(wrapper).to.matchSnapshot();
    });

    it("should match snapshots without classNames sanitization", () => {
        setup({ sanitizeClassNames: false });
        const wrapper = mount(MyVueComponent());
        expect(wrapper).to.matchSnapshot();
    });
});
