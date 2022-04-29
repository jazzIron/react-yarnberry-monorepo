import { Address } from 'react-daum-postcode';
export interface IPostCode {
  visible: boolean;
  onComplete: (val: IAddress) => void;
}

export interface IPostCodeSearch {
  onSearch: (data: IApiAddress) => void;
}

export interface IPostCodeDetail {
  value: string;
  codes: Omit<IAddress, 'detailAddress'>;
  onChange: (val: string) => void;
  onComplete: () => void;
}

export type IApiAddress = Pick<
  Address,
  | 'sido'
  | 'sigungu'
  | 'bname'
  | 'buildingName'
  | 'jibunAddress'
  | 'roadAddress'
  | 'userSelectedType'
  | 'zonecode'
>;
export interface IPostSearchData extends IApiAddress {
  localAddress: string;
}

export interface IAddress {
  zonecode: string;
  localAddress: string;
  detailAddress: string;
}
