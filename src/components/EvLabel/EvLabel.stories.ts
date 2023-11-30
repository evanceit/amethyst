import type {Meta, StoryObj} from "@storybook/vue3";

import {EvLabel} from "../EvLabel";

const meta: Meta<typeof EvLabel> = {
    component: EvLabel,
    title: 'Forms/EvLabel',
    argTypes: {
        text: {
            control: "text",
            description: "The text to display as a label"
        },
        clickable: {
            control: "boolean",
            description: "Indicate to the user that the label is clickable by changing the cursor on hover."
        }
    },
    args: {
        text: 'Example label',
        clickable: false
    },
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof EvLabel>;

export const Primary: Story = {
    render: (args) =>  ({
        components: { EvLabel },
        setup() {
            return { args };
        },
        template: '<ev-label v-bind="args" />'
    }),
};