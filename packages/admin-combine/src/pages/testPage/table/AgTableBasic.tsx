import { AgColumn, AgGrid } from '@common/components';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function AgTableBasic() {
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', width: 150 },
    { field: 'age', width: 90 },
    { field: 'country', width: 120 },
    { field: 'year', width: 90 },
    { field: 'date', width: 110 },
    { field: 'sport', width: 110 },
    { field: 'gold', width: 100 },
    { field: 'silver', width: 100 },
    { field: 'bronze', width: 100 },
    { field: 'total', width: 100 },
  ]);

  const onGridReady = useCallback(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  }, []);

  useEffect(() => {
    onGridReady();
  }, []);

  console.log(rowData);

  return (
    <AgGrid rowData={rowData}>
      <AgColumn headerName="athlete" field="athlete" width={180} />
      <AgColumn headerName="age" field="age" width={180} />
      <AgColumn headerName="country" field="country" width={180} />
    </AgGrid>
  );
}
