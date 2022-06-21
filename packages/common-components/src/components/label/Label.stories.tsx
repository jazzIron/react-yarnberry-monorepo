import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Label } from './Label';
import { sampleData } from './sampleLabel.data';

export default {
  title: `Components/Label`,
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => {
  return <Label {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  options: sampleData,
};
