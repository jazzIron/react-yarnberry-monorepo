import { useArgs } from '@storybook/client-api';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FileUpload } from './FileUpload';

export default {
  title: `Components/FileUpload`,
  component: FileUpload,
} as ComponentMeta<typeof FileUpload>;

const Template: ComponentStory<typeof FileUpload> = (args) => {
  const [{ value }, updateArgs] = useArgs();
  const handleChange = (value: string) => {
    updateArgs({ value: value });
  };

  console.log(value);

  return <FileUpload {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
