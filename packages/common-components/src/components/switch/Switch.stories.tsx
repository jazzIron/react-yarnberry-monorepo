import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Switch } from './Switch';

export default {
  title: `Components/Switch`,
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 'test value',
  disabled: false,
  onClick: (value) => console.log(value),
};

export const label = Template.bind({});
label.args = {
  label: 'test',
};
