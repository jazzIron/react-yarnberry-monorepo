import { ICheckListOption } from './CheckBox_types';
export const checkListSampleOptions = () => {
  const array = [];
  for (let i = 1; i <= 6; i++) {
    array.push({
      id: i.toString(),
      value: `test${i}`,
      label: `test${i}`,
      isRequired: i < 4,
      isChecked: false,
      onClickSuffix: () => console.log(`click checkBox test${i}'s suffixIcon`),
    });
  }
  return array as ICheckListOption[];
};
