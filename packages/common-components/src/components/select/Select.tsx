import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import { ISelect, SELECT_SIZE, ISelectOptionItems } from './Select_types';
import { useState } from 'react';
import { SelectOption } from './SelectOption';
import { Icon, ICON_LIST } from '../icon';

import { theme as Themes, colors, cssx, fonts } from '@common/styles';
import { isEqual, isUndefined } from 'lodash';

export function Select({ size, disabled, defaultValue, options, placeholder, onChange }: ISelect) {
  const sizeStyle = selectSizeStyle[size];
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState<ISelectOptionItems | undefined>(
    !isUndefined(defaultValue)
      ? options.find((obj) => isEqual(obj.value, defaultValue))
      : undefined,
  );

  const handleToggle = () => {
    !disabled && setIsOpen((prev) => !prev);
  };

  const handleChangeOption = (option: ISelectOptionItems) => {
    setSelectedOption(option);
    handleToggle();
    onChange(option);
  };

  return (
    <DropDownWrapper sizeStyle={sizeStyle}>
      <DropDownHeader onClick={handleToggle}>
        <DropDownLabelWrapper>
          {selectedOption ? selectedOption.label : placeholder}
        </DropDownLabelWrapper>
        <DropDownIconWrapper>
          {isOpen ? (
            <Icon icon={ICON_LIST['icn_up']} width="14px" />
          ) : (
            <Icon icon={ICON_LIST['icn_down']} width="14px" />
          )}
        </DropDownIconWrapper>
      </DropDownHeader>
      {isOpen && <SelectOption size={sizeStyle} options={options} onChange={handleChangeOption} />}
    </DropDownWrapper>
  );
}

const selectSizeStyle = {
  [SELECT_SIZE.SMALL]: css`
    padding: 4px 6px;
    ${fonts.body_01};
  `,
  [SELECT_SIZE.MEDIUM]: css`
    height: 32px;
    padding: 6px 14px;
    ${fonts.body_03}
    color: ${colors.black5};
  `,
  [SELECT_SIZE.LARGE]: css`
    padding: 10px 16px;
    font-size: 18px;
  `,
};

Select.defaultProps = {
  size: SELECT_SIZE.MEDIUM,
  disabled: false,
  defaultValue: 10,
  options: [],
  placeholder: 'choice Select',
};

const DropDownWrapper = styled.div<{ sizeStyle: SerializedStyles }>`
  position: relative;
  width: 100%;
  /* ${(props) => props.sizeStyle}; */
`;

const DropDownHeader = styled.div`
  ${cssx.flexBtw}
  height: 32px;
  padding: 6px 12px;
  border-radius: 2px;
  border: solid 1px ${Themes.colors.gray_07};
  ${Themes.fonts.body_02}
  color: ${Themes.colors.gray_02};
  cursor: pointer;
  background-color: #fff;
`;

const DropDownLabelWrapper = styled.div`
  display: flex;
`;
const DropDownIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;
