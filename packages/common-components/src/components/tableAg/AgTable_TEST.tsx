import {
  CellClassParams,
  GridOptions,
  ICellRendererParams,
  RowClassParams,
  ValueFormatterParams,
  ValueGetterParams,
} from 'ag-grid-community';

import { AgColumn } from './AgColumn';
import { AgGrid } from './AgGrid';

/**
 * agGrid event START
 */
// rule에 따른 class name 생성
const rowClassRules = {
  rowClass1: function (params: RowClassParams) {
    return params.data.age === 23;
  },
  rowClass2: function (params: RowClassParams) {
    return params.data.age === 19;
  },
  rowClass3: function (params: RowClassParams) {
    return params.data.age === 27;
  },
};
const getRowStyle = (params: RowClassParams) => {
  if (params.node.rowIndex && params.node.rowIndex % 2 === 0) {
    return { background: '#d3c5ff' };
  }
  return { background: '#fff' };
};
/**
 * agGrid event END
 */

/**
 * agColumn event START
 */
// 조건에 따른 cell options
const cellClassRules = {
  testClassName1: (params: CellClassParams) => params.value === 'Michael Phelps',
  testClassName2: (params: CellClassParams) => params.value === 2004,
};
const cellStyle = (params: CellClassParams) => {
  if (params.value === 'Michael Phelps') {
    return { color: 'red' };
  }
  return null;
};
//함수 또는 표현식 . 표시할 데이터에서 값을 가져옵니다.
const valueGetter = (params: ValueGetterParams) => {
  return `${params.node?.rowIndex}_${params.data.athlete}`;
};
//포매터 설정
const valueFormatter = (params: ValueFormatterParams) => {
  return params.data.athlete.toUpperCase();
};

const cellRendererSelector = (params: ICellRendererParams) => {
  const moodDetails = {
    component: 'GenderClickEvent1',
    params: {
      data: [params.data.athlete],
    },
  };
  const genderDetails = {
    component: 'GenderClickEvent2',
    params: {
      data: params.data.athlete,
    },
  };

  if (params.data.athlete === 'Michael Phelps') return moodDetails;
  else if (params.data.athlete === 'Natalie Coughlin') return genderDetails;
  else return undefined;
};

function rowSpan(params: any) {
  const athlete = params.data.athlete;
  console.log(athlete);
  if (athlete === 'Michael Phelps') {
    return 3;
  } else if (athlete === 'Ryan Lochte') {
    return 4;
  } else {
    return 1;
  }
}
/**
 * agColumn event END
 */

export function AgTable({ onGridReady, rowData, frameworkComponents }: GridOptions) {
  /**
   * pagination = true ===> rowDragManaged = false (드래그 옵션 사용 불가능)
   */
  return (
    <AgGrid
      getRowStyle={getRowStyle}
      onGridReady={onGridReady}
      rowData={rowData}
      pagination={true}
      frameworkComponents={frameworkComponents}
    >
      <AgColumn
        headerName="Athlete"
        field="athlete"
        checkboxSelection={true}
        cellStyle={cellStyle}
        valueGetter={valueGetter}
        valueFormatter={valueFormatter}
        // rowSpan={rowSpan}
        // cellClassRules={{
        //   'cell-span': "value==='Michael Phelps' || value==='Ryan Lochte'",
        // }}
      />
      <AgColumn headerName="Athlete" field="athlete" cellStyle={cellStyle} />
      <AgColumn headerName="Age" field="age" />
      <AgColumn headerName="Country" field="country" />
      <AgColumn headerName="Fun" cellRendererSelector={cellRendererSelector} />
    </AgGrid>
  );
}
