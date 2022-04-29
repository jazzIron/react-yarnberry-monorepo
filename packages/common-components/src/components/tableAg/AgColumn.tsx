import { ColDef } from 'ag-grid-community';
import { AgGridColumn } from 'ag-grid-react';
import './TableAg.scss';

export function AgColumn({
  headerClass,
  headerName,
  width,
  cellStyle,
  cellClassRules,
  field,
  autoHeight,
  wrapText,
  rowDrag,
  checkboxSelection,
  valueFormatter,
  valueGetter,
  cellRendererSelector,
}: ColDef) {
  return (
    <AgGridColumn
      headerClass={headerClass}
      headerName={headerName}
      width={width}
      cellStyle={cellStyle}
      cellClassRules={cellClassRules}
      field={field}
      autoHeight={autoHeight}
      wrapText={wrapText}
      rowDrag={rowDrag}
      checkboxSelection={checkboxSelection}
      valueFormatter={valueFormatter}
      valueGetter={valueGetter}
      cellRendererSelector={cellRendererSelector}
    />
  );
}

AgColumn.defaultProps = {
  headerClass: '',
  headerName: 'HEADER_NAME',
  cellStyle: null,
  cellClassRules: null,
  field: '',
  autoHeight: true,
  wrapText: true,
  rowDrag: false,
  checkboxSelection: false,
  valueFormatter: null,
  valueGetter: null,
  cellRendererSelector: null,
};
