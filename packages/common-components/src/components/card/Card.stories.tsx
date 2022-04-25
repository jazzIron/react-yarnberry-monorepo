import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestPage } from './TestPage';
import { SELECT_TYPE } from './Card_types';

export default {
  title: `Components/Card`,
  component: TestPage,
} as ComponentMeta<typeof TestPage>;

const Template: ComponentStory<typeof TestPage> = (args) => <TestPage {...args} />;

export const Default = Template.bind({});
Default.args = { type: SELECT_TYPE.SINGLE };
