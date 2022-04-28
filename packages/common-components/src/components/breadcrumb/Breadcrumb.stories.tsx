import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

export default {
  title: `Components/Breadcrumb`,
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = {};
