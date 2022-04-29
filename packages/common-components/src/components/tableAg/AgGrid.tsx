import styled from '@emotion/styled';
import { FirstDataRenderedEvent, GridOptions, RowClickedEvent } from 'ag-grid-community';
// eslint-disable-next-line import/order
import { AgGridReact } from 'ag-grid-react';

import './TableAg.scss';

import { debounce, isNil, throttle, isEmpty } from 'lodash';
import { useCallback, useMemo, useRef } from 'react';

import CustomLoadingOverlay from './CustomLoadingOverlay';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import { IAgGrid } from './TableAg_types';

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
  frameworkComponents,
  onRowClick,
  children,
}: IAgGrid) {
  const gridRef = useRef<any>(null);
  const agGridWrapperRef = useRef<any>(null);

  const onGridReady = useCallback((params: FirstDataRenderedEvent) => {
    try {
      changeSizeColumsToFit();
    } catch (e) {
      throw new Error('ERROR');
    }
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    changeSizeColumsToFit();
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
    }, 100),
    [],
  );

  const onGridSizeChanged = useCallback(
    throttle(() => {
      if (isNil(gridRef.current)) return false;
      if (isEmpty(rowData)) return gridRef.current.api.showNoRowsOverlay();

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
      changeSizeColumsToFit();
    }, 0),
    [],
  );

  const handleRowClick = (event: RowClickedEvent) => {
    return onRowClick(event);
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
      // 열 레이블 헤더의 높이 //default 150
      headerHeight: 50,
      // 헤더 열 그룹 행의 높이 default 75
      groupHeaderHeight: 50,
      // 행 클래스 규칙
      rowClassRules: rowClassRules,
      rowSelection: rowSelection,
      rowStyle: rowStyle,
      // 각 행의 스타일을 개별적으로 설정하는 옵션
      getRowStyle: getRowStyle,
      defaultColDef: defaultColDef,
      // 행 애니메이션 활성화
      animateRows: animateRows,
      frameworkComponents: {
        ...frameworkComponents,
        customNoRowsOverlay: CustomNoRowsOverlay,
        customLoadingOverlay: CustomLoadingOverlay,
      },
      // loading component
      loadingOverlayComponent: 'customLoadingOverlay',
      // emptyData component
      noRowsOverlayComponent: 'customNoRowsOverlay',

      onFirstDataRendered: onFirstDataRendered,

      onGridSizeChanged: onGridSizeChanged,
      //onModelUpdated: onModelUpdated,
      // 행 클릭 이벤트
      onRowClicked: handleRowClick,
      //행 강조
      suppressRowHoverHighlight: suppressRowHoverHighlight,
      //열 강조
      columnHoverHighlight: columnHoverHighlight,
      // 행 그래그 앤 드롭
      suppressMoveWhenRowDragging: suppressMoveWhenRowDragging,
      rowDragManaged: rowDragManaged,

      // 행 확장
      suppressRowTransform: suppressRowTransform,
      // 레이아웃 옵션 기본 normal
      domLayout: 'autoHeight',

      // 테스트 진행중
      // loadingCellRendererSelector: loadingCellRendererSelector,
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
  frameworkComponents: null,
  loading: true,
  onRowClick: (event: RowClickedEvent) => true,
};

const AgGridStyled = styled.div`
  height: 100%;
  width: 100%;
`;

const AgGridWrapper = styled.div`
  height: 100%;
  width: 100%;
`;
