import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pagenation } from './Pagenation';
import { sampleData } from './sample.data';

export default {
  title: `Components/Pagenation`,
  component: Pagenation,
} as ComponentMeta<typeof Pagenation>;

const Template: ComponentStory<typeof Pagenation> = (args) => <Pagenation {...args} />;

export const Default = Template.bind({});
Default.args = {
  paging: sampleData.paging,
};
