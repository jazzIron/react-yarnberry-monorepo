import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormTest } from './FormTest';

export default {
  title: `components/FormTest`,
  component: FormTest,
} as ComponentMeta<typeof FormTest>;

const Template: ComponentStory<typeof FormTest> = (args) => <FormTest />;

export const Default = Template.bind({});
Default.args = {};
