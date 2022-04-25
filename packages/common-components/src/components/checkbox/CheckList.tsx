import styled from '@emotion/styled';
import { ICheckListProps } from './CheckBox_types';
import { CheckBox } from './CheckBox';
import { useCheckList } from './useCheckList';

export function CheckList({
  masterLabel,
  options,
  onChange,
  allRequiredCheck,
  suffixIcon,
}: ICheckListProps) {
  const { requiredList, optionalList, masterCheck, onToggleMasterCheckBox, onToggleCheckBox } =
    useCheckList(options, onChange, allRequiredCheck);

  return (
    <CheckListStyled>
      <MasterCheck>
        <CheckBox
          label={masterLabel}
          onChange={onToggleMasterCheckBox}
          isChecked={masterCheck}
          value={'masterCheckBox'}
        />
      </MasterCheck>
      <RequiredCheckList>
        {requiredList.map((option) => (
          <CheckBox
            key={option.id}
            label={`${option.label} (필수)`}
            value={option.value}
            isChecked={option.isChecked}
            disabled={option.disabled}
            onClickSuffix={option.onClickSuffix}
            suffixIcon={suffixIcon}
            onChange={() => onToggleCheckBox(option.id)}
          />
        ))}
      </RequiredCheckList>
      <OptionalCheckList>
        {optionalList.map((option) => (
          <CheckBox
            key={option.id}
            label={`${option.label} (선택)`}
            value={option.value}
            isChecked={option.isChecked}
            disabled={option.disabled}
            onClickSuffix={option.onClickSuffix}
            suffixIcon={suffixIcon}
            onChange={() => onToggleCheckBox(option.id)}
          />
        ))}
      </OptionalCheckList>
    </CheckListStyled>
  );
}

const CheckListStyled = styled.div``;
const MasterCheck = styled.div``;
const RequiredCheckList = styled.div``;
const OptionalCheckList = styled.div``;
