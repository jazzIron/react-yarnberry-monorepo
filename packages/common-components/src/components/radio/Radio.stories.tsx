import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Radio } from './Radio';
import { useArgs } from '@storybook/client-api';
import { sampleData } from './sample.data';
import { RADIO_THEME } from './Radio_types';

export default {
  title: `Components/Radio`,
  component: Radio,
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => {
  const [{ value }, updateArgs] = useArgs();

  const handleChange = (value: string) => {
    console.log(value);
    updateArgs({ value: value });
  };

  return <Radio {...args} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  theme: RADIO_THEME.DEFAULT,
  options: sampleData,
};

export const RadioButton = Template.bind({});
RadioButton.args = {
  theme: RADIO_THEME.BUTTON,
  options: sampleData,
  value: '2',
};
