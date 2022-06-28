import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ICON_LIST } from '../icon';
import { BUTTON_SIZE } from './Button_types';
import { TextButton } from './TextButton';

export default {
  title: `Components/TextButton`,
  component: TextButton,
  argTypes: {
    size: {
      options: BUTTON_SIZE,
      defaultValue: BUTTON_SIZE.SMALL,
      control: {
        type: 'select',
      },
    },
    leftIcon: {
      options: ICON_LIST,
      defaultValue: ICON_LIST.repo,
      control: {
        type: 'select',
      },
    },
    rightIcon: {
      options: ICON_LIST,
      defaultValue: ICON_LIST.repo,
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof TextButton>;

const Template: ComponentStory<typeof TextButton> = (args) => <TextButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '텍스트 버튼',
  onClick: () => console.log('click'),
  isDisabled: false,
  leftIcon: 'icn_plus2',
  rightIcon: 'icn_arrow_58_x_58',
};
