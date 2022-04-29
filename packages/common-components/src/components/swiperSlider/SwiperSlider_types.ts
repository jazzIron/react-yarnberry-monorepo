export enum SWIPER_SIZE {
  DEFAULT = 'DEFAULT',
}

export interface ISwiperSlide {
  images: string[];
  slidesPerView: number;
  size: SWIPER_SIZE;
}
