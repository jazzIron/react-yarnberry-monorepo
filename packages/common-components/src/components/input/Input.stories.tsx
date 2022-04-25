import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './Input';
import { useArgs } from '@storybook/client-api';

export default {
  title: `Components/Input`,
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => {
  const [{ value }, updateArgs] = useArgs();
  const handleChange = (value: string) => {
    updateArgs({ inputValue: value });
  };

  return <Input {...args} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {};
