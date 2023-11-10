import type {Meta, StoryObj} from "@storybook/vue3";
import {EvForm} from "@/components/EvForm";
import {ref, shallowRef} from "vue";
import EvTextfield from "@/components/EvTextfield/EvTextfield.vue";
import EvButton from "@/components/EvButton/EvButton.vue";

const meta: Meta<typeof EvForm> = {
    component: EvForm,
    title: 'Forms/EvForm',
    argTypes: {

    },
    args: {

    },
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof EvForm>;

const formRef = ref();

export const Primary: Story = {
    render: (args) =>  ({
        components: { EvForm, EvTextfield, EvButton },
        setup() {
            let timeout = null;

            const loading = shallowRef(false);
            let username = shallowRef('');

            const requiredValidator = async (value) => {
                return new Promise(resolve => {
                   clearTimeout(timeout);
                   timeout = setTimeout(() => {
                        if (!value) return resolve('Please enter a username');
                        return resolve(true);
                   }, 1000);
                });
            };

            return { args, formRef, requiredValidator, loading, username };
        },
        methods: {
            async submit(event) {
                this.loading = true;
                const results = await event;
                this.loading = false;
                console.log(results);
            }
        },
        template: `<ev-form validate-on="submit lazy" @submit.prevent="submit">
          <ev-textfield v-model="username" :validators="[requiredValidator]" label="Username" />
            <ev-button :loading="loading" full-width>Submit</ev-button>
            <ev-button type="reset">Reset</ev-button>
        </ev-form> {{ username }}`
    }),
};