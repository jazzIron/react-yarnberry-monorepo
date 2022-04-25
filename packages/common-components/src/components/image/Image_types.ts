export enum IMAGE_FIT {
  COVER = 'cover',
}

export interface IImage {
  image: string;
  onClick?: () => void;
  width?: string;
  fit?: IMAGE_FIT;
}
