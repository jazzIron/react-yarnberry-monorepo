import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SPACE_DIRECTION } from './Space_types';
import { Space } from './Space';

export default {
  title: `Components/Layout/Space`,
  component: Space,
  argTypes: {
    gap: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
} as ComponentMeta<typeof Space>;

const Template: ComponentStory<typeof Space> = (args) => <Space {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Horizontal = Template.bind({});
Horizontal.args = {
  direction: SPACE_DIRECTION.HORIZONTAL,
};
export const Vertical = Template.bind({});
Vertical.args = {
  direction: SPACE_DIRECTION.VERTICAL,
};
