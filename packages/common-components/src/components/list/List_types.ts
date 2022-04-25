import { ReactNode } from 'react';

export enum LIST_SIZE {
  DEFALUT = 'DEFAULT',
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

export interface IList<T> {
  size: LIST_SIZE;
  bordered: boolean;
  dataSource: [];
  footer: ReactNode;
  header: ReactNode;
  loading: boolean;
  children: JSX.Element | JSX.Element[];
  renderItem?: (item: T, index: number) => React.ReactNode;
}

export interface IListItem {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}
