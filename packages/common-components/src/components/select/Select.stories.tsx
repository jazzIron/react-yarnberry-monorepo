import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from './Select';
import { sampleData } from './sample.data';
import { useMemo } from 'react';
// import { makePaymentTypeOption } from '@src/utils/treat/treat';
import { ISelectOptionItems } from './Select_types';

export default {
  title: `Components/Select`,
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: sampleData,
};

export const SetDefaultValue = Template.bind({});
SetDefaultValue.args = {
  options: sampleData,
  defaultValue: '2',
};

// export const Test = () => {
//   const paymentTypeOption = useMemo(() => makePaymentTypeOption(false, 'SEARCH_PARAM'), []);

//   const handleChangeExpensesType = (option: ISelectOptionItems) => {
//     console.log(option);
//   };

//   console.log(paymentTypeOption);

//   return (
//     <Select
//       onChange={handleChangeExpensesType}
//       options={paymentTypeOption}
//       defaultValue={paymentTypeOption[0].value}
//       // placeholder={'진료비 구분'}
//     />
//   );
// };
