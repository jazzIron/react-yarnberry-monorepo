/**
 * AG Grid Community
 * AG Grid Community is a free to use product distributed under the MIT License. It is free to use in your production environments.
 *
 * AG Charts Community
 * AG Charts Community (a.k.a. Standalone Charts) is a free to use product distributed under the MIT License. It is free to use in your production environments.
 *
 *  https://www.ag-grid.com/react-data-grid/localisation/
 */

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { useState } from 'react';
import { Button } from '@components/button/Button';
import { AgTable } from './AgTable_TEST';
import { FirstDataRenderedEvent } from 'ag-grid-community';

export default {
  title: `Components/TableAg`,
  component: AgTable,
} as ComponentMeta<typeof AgTable>;

const Template: ComponentStory<typeof AgTable> = (args) => {
  const [rowData, setRowdata] = useState();
  const onGridReady = async (params: FirstDataRenderedEvent) => {
    return true;
    // try {
    //   const response = await axios.get(
    //     'https://www.ag-grid.com/example-assets/olympic-winners.json',
    //   );
    //   params.columnApi.autoSizeAllColumns();
    //   setRowdata(response.data);
    // } catch (e) {
    //   throw new Error('ERROR');
    // }
  };

  const frameworkComponents = {
    GenderClickEvent1: (props: any) => {
      return <Button label={'보기'} onClick={() => alert(props.data)} />;
    },
    GenderClickEvent2: (props: any) => {
      return <Button label={'확인하기'} onClick={() => alert(props.data)} />;
    },
  };

  return (
    <AgTable
      onGridReady={onGridReady}
      rowData={rowData}
      frameworkComponents={frameworkComponents}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
