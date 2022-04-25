import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Textarea } from './Textarea';
import { useArgs } from '@storybook/client-api';
import { TEXTAREA_THEME } from './Textarea_types';

export default {
  title: `Components/Textarea`,
  component: Textarea,
  argTypes: {
    theme: {
      options: TEXTAREA_THEME,
      defaultValue: TEXTAREA_THEME.BORDER,
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => {
  const [{ value }, updateArgs] = useArgs();
  const handleChange = (value: string) => {
    updateArgs({ value: value });
  };
  return <Textarea {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  // theme: TEXTAREA_THEME.BORDER,
  disabled: false,
  placeholder: '입력해주세요',
  // value: '',
  maxLength: 500,
  readOnly: false,
  rows: 10,
};
