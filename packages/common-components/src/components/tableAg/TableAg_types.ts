import {
  GridOptions,
  RowClickedEvent,
  CellClickedEvent,
  ICellRendererParams,
  CellClassParams,
  ValueFormatterParams,
  ValueGetterParams,
  IsFullWidthRowParams,
  RowClassParams,
} from 'ag-grid-community';
import { ReactNode } from 'react';

export interface IAgGrid extends GridOptions {
  className:
    | 'ag-theme-alpine'
    | 'ag-theme-alpine-dark'
    | 'ag-theme-balham'
    | 'ag-theme-balham-dark'
    | 'ag-theme-material';
  children: ReactNode | ReactNode[];
  onRowClick: (event: RowClickedEvent) => void;
  onCellClicked: (event: CellClickedEvent) => void;
  fullWidthCellRendererComponent?: () => any;
}

export type {
  ICellRendererParams,
  CellClassParams,
  ValueFormatterParams,
  RowClickedEvent,
  CellClickedEvent,
  ValueGetterParams,
  IsFullWidthRowParams,
  RowClassParams,
};
