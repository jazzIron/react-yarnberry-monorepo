import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import { ISelect, SELECT_SIZE, ISelectOptionItems } from './Select_types';
import { useEffect, useRef, useState } from 'react';
import { SelectOption } from './SelectOption';
import { Icon, ICON_LIST } from '../icon';

import { theme as Themes, colors, cssx, fonts } from '@common/styles';
import { isEqual, isUndefined } from 'lodash';

const useOutsideClick = (
  ref: React.MutableRefObject<any>, // generic으로 바꿀 예정
  handlerCallback: (event?: CustomEvent<MouseEvent>) => void,
) => {
  useEffect(() => {
    const listener = (event: CustomEvent<MouseEvent>) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handlerCallback(event);
    };
    document.addEventListener('mousedown', listener as EventListener);
    document.addEventListener('touchstart', listener as EventListener);
    return () => {
      document.removeEventListener('mousedown', listener as EventListener);
      document.removeEventListener('touchstart', listener as EventListener);
    };
  }, [ref, handlerCallback]);
};
export function Select({ size, disabled, defaultValue, options, placeholder, onChange }: ISelect) {
  const sizeStyle = selectSizeStyle[size];
  const [isOpen, setIsOpen] = useState(false);
  const outsideRef = useRef(null);

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

  const outsideCallback = () => {
    setIsOpen(false);
  };

  useOutsideClick(outsideRef, outsideCallback);

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
