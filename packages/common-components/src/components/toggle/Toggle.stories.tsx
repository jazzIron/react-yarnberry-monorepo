import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Toggle } from './Toggle';

export default {
  title: `Components/Toggle`,
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => {
  return <Toggle {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
