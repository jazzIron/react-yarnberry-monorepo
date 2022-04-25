import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputForm } from './InputForm';
import { useArgs } from '@storybook/client-api';
import { ICON_LIST } from '@src/components/icon';

export default {
  title: `Components/InputForm`,
  component: InputForm,
  argTypes: {
    prefixIcon: {
      options: Object.keys(ICON_LIST),
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof InputForm>;

const Template: ComponentStory<typeof InputForm> = (args) => {
  const [{ value }, updateArgs] = useArgs();
  const handleChange = (value: string) => {
    updateArgs({ inputValue: value });
  };

  return <InputForm {...args} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {};
