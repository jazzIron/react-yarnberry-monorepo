import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Swipercore, { Navigation, Thumbs, Pagination } from 'swiper';
import { ISwiperSlide, SWIPER_SIZE } from './SwiperSlider_types';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

Swipercore.use([Thumbs, Navigation, Pagination]);

export function SwiperSlider({ images, slidesPerView, size }: ISwiperSlide) {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swipercore | null>(null);
  const swiperSizeStyle = swiperSizeStyles[size];
  return (
    <SwiperSliderStyled sizeStyle={swiperSizeStyle}>
      <Swiper
        loop={true}
        spaceBetween={0}
        speed={400}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {images.map((image, idx) => (
          <SwiperSlide key={image + `_${idx}`}>
            <Image src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        speed={400}
        spaceBetween={0}
        slidesPerView={slidesPerView}
        freeMode={true}
        watchSlidesProgress={true}
      >
        {images.map((image, idx) => (
          <SwiperSlide key={`${idx}_` + image}>
            <Image src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperSliderStyled>
  );
}

const swiperSizeStyles = {
  [SWIPER_SIZE.DEFAULT]: css`
    width: 500px;
    height: 300px;
  `,
};
const SwiperSliderStyled = styled.div<{ sizeStyle: SerializedStyles }>`
  ${(props) => props.sizeStyle}
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
