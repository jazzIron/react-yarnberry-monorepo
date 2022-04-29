import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Toast } from './Toast';

export default {
  title: `Components/Toast`,
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const Default = Template.bind({});
Default.args = {};
