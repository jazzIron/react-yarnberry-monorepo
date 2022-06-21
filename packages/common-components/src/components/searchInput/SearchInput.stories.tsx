import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import { ICON_LIST } from '@src/components/icon';
import { SearchInput } from './SearchInput';

export default {
  title: `Components/SearchInput`,
  component: SearchInput,
  argTypes: {
    prefixIcon: {
      options: Object.keys(ICON_LIST),
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof SearchInput>;

const Template: ComponentStory<typeof SearchInput> = (args) => {
  const [{ value }, updateArgs] = useArgs();
  const handleChange = (value: string) => {
    updateArgs({ inputValue: value });
  };

  return <SearchInput {...args} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {};
