import styled from '@emotion/styled';
import {
  CellClickedEvent,
  FirstDataRenderedEvent,
  GridOptions,
  IsFullWidthRowParams,
  RowClickedEvent,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import './TableAg.scss';

import { debounce, isNil, throttle, isEmpty } from 'lodash';
import { useCallback, useMemo, useRef, useEffect } from 'react';

import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import { IAgGrid } from './TableAg_types';
import CustomLoadingOverlay from './CustomLoadingOverlay';

export function AgGrid({
  // onGridReady,
  rowData,
  className,
  getRowStyle,
  rowStyle,
  defaultColDef,
  rowClassRules,
  rowSelection,
  rowDragManaged,
  suppressMoveWhenRowDragging,
  suppressRowHoverHighlight,
  suppressRowTransform,
  columnHoverHighlight,
  animateRows,
  components,
  onRowClick,
  children,
  isFullWidthRow,
  fullWidthCellRendererComponent,
  onCellClicked,
}: IAgGrid) {
  const gridRef = useRef<any>(null);
  const agGridWrapperRef = useRef<any>(null);

  const onGridReady = useCallback(
    async (params: FirstDataRenderedEvent) => {
      try {
        if (isEmpty(rowData)) {
          gridRef.current.api.showNoRowsOverlay();
        }
        gridRef.current.api.sizeColumnsToFit();
      } catch (e) {
        throw new Error('ERROR');
      }
    },
    [rowData],
  );

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    //changeSizeColumsToFit();
  }, []);

  const hideOverlay = useCallback(
    throttle(() => {
      if (gridRef.current) gridRef.current.api.hideOverlay();
    }, 500),
    [],
  );

  const changeSizeColumsToFit = useCallback(
    throttle(() => {
      gridRef.current.api.sizeColumnsToFit();
      hideOverlay();
    }, 0),
    [],
  );

  const onGridSizeChanged = useCallback(
    throttle(() => {
      if (isNil(gridRef.current)) return false;
      const gridWidth = agGridWrapperRef.current.offsetWidth;
      const columnsToShow = [];
      const columnsToHide = [];
      let totalColsWidth = 0;
      const allColumns = gridRef.current.columnApi.getAllColumns();
      if (allColumns && allColumns.length > 0) {
        for (let i = 0; i < allColumns.length; i++) {
          const column = allColumns[i];
          totalColsWidth += column.getMinWidth() || 0;
          if (totalColsWidth > gridWidth) {
            columnsToHide.push(column.getColId());
          } else {
            columnsToShow.push(column.getColId());
          }
        }
      }
      gridRef.current.columnApi.setColumnsVisible(columnsToShow, true);
      gridRef.current.columnApi.setColumnsVisible(columnsToHide, false);
      gridRef.current.api.sizeColumnsToFit();
    }, 0),
    [],
  );

  const handleRowClick = (event: RowClickedEvent) => {
    return onRowClick(event);
  };

  const handleCellClick = (event: CellClickedEvent) => {
    return onCellClicked(event);
  };

  // const loadingCellRendererSelector = (params: ILoadingCellRendererParams) => {
  //   console.log(params);
  //   const customLoadingOverlay = {
  //     component: 'CustomLoadingOverlay',
  //     params: {
  //       loadingMessage: '--- CUSTOM ERROR MESSAGE ---',
  //     },
  //     frameworkComponent: CustomLoadingOverlay,
  //   };
  //   return customLoadingOverlay;
  // };

  const gridOptions: GridOptions = useMemo(() => {
    return {
      // ??? ????????? ????????? ?????? //default 150
      headerHeight: 50,
      // ?????? ??? ?????? ?????? ?????? default 75
      groupHeaderHeight: 50,
      // ??? ????????? ??????
      rowClassRules: rowClassRules,
      rowSelection: rowSelection,
      rowStyle: rowStyle,
      // ??? ?????? ???????????? ??????????????? ???????????? ??????
      getRowStyle: getRowStyle,
      defaultColDef: defaultColDef,
      // ??? ??????????????? ?????????
      animateRows: animateRows,
      components: {
        ...components,
        customNoRowsOverlay: CustomNoRowsOverlay,
        customLoadingOverlay: CustomLoadingOverlay,
        fullWidthCellRendererFramework: fullWidthCellRendererComponent,
      },
      // loading component
      loadingOverlayComponent: 'customLoadingOverlay',
      // emptyData component
      noRowsOverlayComponent: 'customNoRowsOverlay',

      onFirstDataRendered: onFirstDataRendered,

      onGridSizeChanged: onGridSizeChanged,
      //onModelUpdated: onModelUpdated,
      // ??? ?????? ?????????
      onRowClicked: handleRowClick,
      //??? ??????
      suppressRowHoverHighlight: suppressRowHoverHighlight,
      //??? ??????
      columnHoverHighlight: columnHoverHighlight,
      // ??? ????????? ??? ??????
      suppressMoveWhenRowDragging: suppressMoveWhenRowDragging,
      rowDragManaged: rowDragManaged,

      // ??? ??????
      suppressRowTransform: suppressRowTransform,
      // ???????????? ?????? ?????? normal
      domLayout: 'autoHeight',

      // ????????? ?????????
      // loadingCellRendererSelector: loadingCellRendererSelector,
      isFullWidthRow: isFullWidthRow,
      //??? ?????? ????????? :
      onCellClicked: handleCellClick,
    };
  }, []);

  return (
    <AgGridWrapper>
      <AgGridStyled ref={agGridWrapperRef} className={className}>
        <AgGridReact
          onGridReady={onGridReady}
          ref={gridRef}
          rowData={rowData}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
        >
          {children}
        </AgGridReact>
      </AgGridStyled>
    </AgGridWrapper>
  );
}

AgGrid.defaultProps = {
  className: 'ag-theme-alpine',
  rowStyle: null,
  getRowStyle: null,
  defaultColDef: {
    sortable: false,
    resizable: true,
  },
  rowClassRules: null,
  rowSelection: null,
  rowDragManaged: false,
  suppressMoveWhenRowDragging: false,
  suppressRowHoverHighlight: false,
  suppressRowTransform: false,
  columnHoverHighlight: false,
  animateRows: true,
  components: null,
  loading: true,
  onRowClick: (event: RowClickedEvent) => true,
  onCellClicked: (event: CellClickedEvent) => true,
  isFullWidthRow: (params: IsFullWidthRowParams) => false,
};

const AgGridStyled = styled.div`
  height: 100%;
  width: 100%;
`;

const AgGridWrapper = styled.div`
  height: 100%;
  width: 100%;
`;
