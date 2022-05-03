export enum MODAL_SIZE {
  XS = 'XS',
  SMALL = 'SMALL',
  REGULAR = 'REGULAR',
  LARGE = 'LARGE',
}

export interface IModal {
  isOpen: boolean;
  title?: string;
  contents: JSX.Element;
  useReqClose: boolean;
  size: MODAL_SIZE;
  onClose: (state: boolean) => void;
  sizeCustom?: {
    width: string;
    height: string;
  };
}
