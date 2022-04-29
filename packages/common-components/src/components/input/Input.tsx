import { MouseEvent, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme as Themes, cssx } from '@common/styles';
import { IInput } from './Input_types';
import { INPUT_TYPE } from './InputForm_types';
import { ICON_LIST } from '../icon';

export function Input({
  type,
  inputValue,
  allowClear,
  placeholder,
  maxLength,
  readOnly,
  onChange,
}: IInput) {
  const IconSize = '14px';
  const inputRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent<HTMLInputElement>) => e.preventDefault();
  const handleClickAllowClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChange('');
  };

  /*test1*/

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const maxInput = maxLength ? maxLength : 0;
    if (maxInput > 0) {
      return onChange(value.slice(0, maxInput));
    }
    onChange(value);
  };
  return (
    <InputWrapper ref={inputRef} readOnly={readOnly}>
      <InputStyled
        type={type}
        value={inputValue}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {allowClear && inputValue && (
        <IconClearWrapper onClick={handleClickAllowClear} onMouseDown={handleMouseDown}>
          {/* clear */}
          <img src={ICON_LIST['icn_clean']} width={IconSize} alt="icn_clean" />
        </IconClearWrapper>
      )}
    </InputWrapper>
  );
}

Input.defaultProps = {
  type: INPUT_TYPE.TEXT,
  readOnly: false,
  placeholder: '입력해 주세요.',
  inputValue: '',
  allowClear: true,
  maxLength: 100,
};

const InputWrapper = styled.div<{ readOnly: boolean }>`
  ${cssx.flexStart}
  background-color: #fff;
  align-items: center;
  height: 32px;
  padding: 5px 12px;
  border-radius: 2px;
  border: 1px solid ${(props) => Themes.colors.gray_07};
  padding: 6px 12px;
  ${(props) => Themes.fonts.body_01}
  ${(props) =>
    props.readOnly &&
    css`
      pointer-events: none;
      & input {
        background-color: ${Themes.colors.gray_11};
        ::placeholder {
          color: ${Themes.colors.gray5};
        }
      }
    `};
`;
const InputStyled = styled.input`
  border-style: none;
  :focus {
    outline: none;
  }
  display: inline-flex;
  flex: 1;
  ${(props) => Themes.fonts.body_01}
  color: ${(props) => Themes.colors.gray_02};
  ::placeholder {
    ${(props) => Themes.fonts.body_02}
    color: ${(props) => Themes.colors.gray6};
  }
`;

const IconClearWrapper = styled.span`
  display: inline-flex;
  cursor: pointer;
`;
