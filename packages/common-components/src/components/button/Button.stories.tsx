import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BUTTON_SIZE, BUTTON_THEME } from './Button_types';
import { Button } from './Button';
import { SUCCESS } from '../alert/Alert.stories';

export default {
  title: `Components/Button`,
  component: Button,
  argTypes: {
    theme: {
      options: BUTTON_THEME,
      defaultValue: BUTTON_THEME.PRIMARY,
      control: {
        type: 'select',
      },
    },
    size: {
      options: BUTTON_SIZE,
      defaultValue: BUTTON_SIZE.SMALL,
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'click',
  onClick: () => console.log('click'),
  isDisabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'click',
  onClick: () => console.log('click'),
  isDisabled: true,
};

export const LineBlue = Template.bind({});
LineBlue.args = {
  label: 'click',
  onClick: () => console.log('click'),
  theme: BUTTON_THEME.LINEBLUE,
};

export const LineBlack = Template.bind({});
LineBlack.args = {
  label: 'click',
  onClick: () => console.log('click'),
  theme: BUTTON_THEME.LINEBLACK,
};

export const Negative = Template.bind({});
Negative.args = {
  label: 'click',
  onClick: () => console.log('click'),
  theme: BUTTON_THEME.NEGATIVE,
};
