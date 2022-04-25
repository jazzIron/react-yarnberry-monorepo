import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Collapse } from './Collapse';
import { makeBulkContent } from './sample.data';
export default {
  title: `Components/Collapse`,
  component: Collapse,
} as ComponentMeta<typeof Collapse>;

const Template: ComponentStory<typeof Collapse> = (args) => <Collapse {...args} />;

export const Default = Template.bind({});
Default.args = {
  contents: makeBulkContent(30),
};
