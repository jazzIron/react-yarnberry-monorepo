import { useEffect, useState } from 'react';
import { ICheckListOption } from './CheckBox_types';

export function useCheckList(
  options: ICheckListOption[],
  onChange: (val: string[]) => void,
  allRequiredCheck: (val: boolean) => void,
) {
  const [masterCheck, setMasterCheck] = useState(false);
  const [list, setList] = useState(options);
  const [requiredList, setRequiredList] = useState<ICheckListOption[]>(
    list.filter((option) => option.isRequired),
  );
  const [optionalList, setOptionalList] = useState<ICheckListOption[]>(
    list.filter((option) => !option.isRequired),
  );

  const onToggleMasterCheckBox = () => {
    setMasterCheck(!masterCheck);
    if (isAllChecked()) {
      setList((prevState) => prevState.map((option) => ({ ...option, isChecked: false })));
      return;
    }
    setList((prevState) => prevState.map((option) => ({ ...option, isChecked: true })));
  };

  const onToggleCheckBox = (id: string) => {
    setList((prevState) =>
      prevState.map((option) =>
        option.id === id ? { ...option, isChecked: !option.isChecked } : option,
      ),
    );
  };

  const isAllChecked = () => {
    const unChecked = list.filter((option) => !option.isChecked);
    return !unChecked.length;
  };
  const isAllRequiredChecked = () => {
    const checkedRequired = list.filter((option) => option.isRequired && option.isChecked);
    return checkedRequired.length === requiredList.length;
  };
  const checkedList = () => list.filter((option) => option.isChecked).map((option) => option.value);

  useEffect(() => {
    setRequiredList(list.filter((option) => option.isRequired));
    setOptionalList(list.filter((option) => !option.isRequired));
    onChange(checkedList());
    allRequiredCheck(isAllRequiredChecked());
    if (!isAllChecked()) {
      setMasterCheck(false);
    }
  }, [list]);

  return {
    requiredList,
    optionalList,
    masterCheck,
    onToggleMasterCheckBox,
    onToggleCheckBox,
  };
}
