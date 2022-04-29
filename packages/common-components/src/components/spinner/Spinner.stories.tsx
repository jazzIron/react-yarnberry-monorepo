import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Spinner } from './Spinner';
import { SPINNER_TYPE } from './Spinner_types';

export default {
  title: `Components/Spinner`,
  component: Spinner,
  argTypes: {
    type: {
      options: Object.values(SPINNER_TYPE),
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  onActive: true,
  fullCover: true,
};
