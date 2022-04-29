import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PostCode } from './PostCode';

import { IAddress } from '.';

export default {
  title: `Components/PostCode`,
  component: PostCode,
} as ComponentMeta<typeof PostCode>;

const Template: ComponentStory<typeof PostCode> = (args) => <PostCode {...args} />;

export const Default = Template.bind({});
Default.args = {
  visible: true,
  onComplete: (data: IAddress) => console.log(data),
};
