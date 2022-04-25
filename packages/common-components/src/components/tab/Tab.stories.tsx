import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tab } from './Tab';

const options = [
  {
    id: 'tab1',
    text: 'tab1',
  },
  {
    id: 'tab2',
    text: 'tab2',
  },
  {
    id: 'tab3',
    text: 'tab3',
  },
  {
    id: 'tab4',
    text: 'tab4',
  },
];

export default {
  title: `Components/Tab`,
  component: Tab,
  argTypes: {
    activeId: {
      options: options.map((obj) => obj.id),
      defaultValue: options[0]['id'],
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = (args) => <Tab {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: options,
};
