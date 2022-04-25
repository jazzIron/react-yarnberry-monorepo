import { ComponentStory, ComponentMeta } from '@storybook/react';
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
  },
} as ComponentMeta<typeof TextButton>;

const Template: ComponentStory<typeof TextButton> = (args) => <TextButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '텍스트 버튼',
  onClick: () => console.log('click'),
  isDisabled: false,
  leftIcon: 'icn_plus2',
  rightiCon: 'icn_arrow_58_x_58',
};
