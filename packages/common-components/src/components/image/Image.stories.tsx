import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Image } from './Image';
import { IMAGE_LIST } from './image.data';

export default {
  title: `Components/Image`,
  component: Image,
  argTypes: {
    image: {
      options: IMAGE_LIST,
      defaultValue: IMAGE_LIST.sample,
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const ImageList = () => {
  return (
    <>
      {Object.keys(IMAGE_LIST).map((img, idx) => (
        <Image image={IMAGE_LIST[img]} key={idx} />
      ))}
    </>
  );
};
