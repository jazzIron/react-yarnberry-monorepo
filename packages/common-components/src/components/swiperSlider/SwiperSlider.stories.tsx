import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SwiperSlider } from './SwiperSlider';
import { ISwiperSlide, SWIPER_SIZE } from './SwiperSlider_types';

export default {
  title: `Components/SwiperSlider`,
  component: SwiperSlider,
} as ComponentMeta<typeof SwiperSlider>;

const Template: ComponentStory<typeof SwiperSlider> = (args: ISwiperSlide) => (
  <SwiperSlider {...args} />
);

const testSlides = () => {
  const array = [];
  for (let i = 0; i < 10; i++) {
    array.push('https://picsum.photos/300/200');
  }
  return array;
};

export const Default = Template.bind({});
Default.args = {
  images: testSlides(),
  slidesPerView: 4,
  size: SWIPER_SIZE.DEFAULT,
};
