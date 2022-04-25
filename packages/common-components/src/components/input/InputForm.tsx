import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import { MouseEvent, useRef } from 'react';
import { IInputForm, INPUT_FORM_THEME, INPUT_TYPE } from './InputForm_types';
import { ICON_LIST } from '@src/components/icon';
import { useState } from 'react';
import { isNil } from 'lodash';
import { theme as Themes, colors, fonts, cssx } from '@common/styles';

export function InputForm({
  type,
  theme,
  inputValue,
  renderState,
  allowClear,
  placeholder,
  maxLength,
  readOnly,
  prefixIcon,
  onChange,
}: IInputForm) {
  const IconSize = '14px';
  const themeStyle = themeStyles[theme];
  const inputRef = useRef<HTMLDivElement>(null);
  const [hasFocus, setFocus] = useState(false);

  // 이벤트 전파 방치 처리
  const handleMouseDown = (e: MouseEvent<HTMLInputElement>) => e.preventDefault();

  const handleClickAllowClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChange('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const maxInput = maxLength ? maxLength : 0;
    if (maxInput > 0) {
      return onChange(value.slice(0, maxInput));
    }
    onChange(value);
  };

  const handleFocus = () => {
    if (!isNil(inputRef.current)) {
      inputRef.current.style.borderColor =
        renderState === 'ERROR' ? Themes.colors.red1 : Themes.colors.ays_maincolor;
    }
    return setFocus(true);
  };

  const handleBlur = () => {
    if (!isNil(inputRef.current)) {
      inputRef.current.style.borderColor =
        renderState === 'ERROR' ? Themes.colors.red1 : Themes.colors.gray_07;
    }
    return setFocus(false);
  };

  return (
    <InputFormWrapper ref={inputRef} readOnly={readOnly} styles={themeStyle}>
      {prefixIcon && (
        <IconWrapper onClick={handleClickAllowClear}>
          <img src={ICON_LIST[prefixIcon]} width={IconSize} alt="prefix_Icon" />
        </IconWrapper>
      )}
      <InputFormStyled
        type={type}
        value={inputValue}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {allowClear && inputValue && hasFocus && (
        <IconClearWrapper onClick={handleClickAllowClear} onMouseDown={handleMouseDown}>
          {/* clear */}
          <img src={ICON_LIST['icn_clean']} width={IconSize} alt="icn_clean" />
        </IconClearWrapper>
      )}
      {/* {renderState === 'SUCCESS' && !hasFocus && (
        <IconCheckWrapper>
          success
          <img src={ICON_LIST['icn_check']} width={IconSize} alt="icn_check" />
        </IconCheckWrapper>
      )} */}
    </InputFormWrapper>
  );
}

InputForm.defaultProps = {
  type: INPUT_TYPE.TEXT,
  theme: INPUT_FORM_THEME.DEFAULT,
  inputValue: '',
  vaild: false,
  allowClear: true,
  error: false,
  maxLength: 4000,
  placeholder: 'placeHolder 내용노출',
  readOnly: false,
};

const themeStyles = {
  [INPUT_FORM_THEME.DEFAULT]: css`
    padding: 4px 6px;
    ${fonts.body_01};
  `,
  // 추가
};

interface IWrapper {
  readOnly: boolean;
  styles: SerializedStyles;
}

const InputFormWrapper = styled.div<IWrapper>`
  flex: 1;
  flex-grow: 0;
  ${cssx.flexStart}
  height: 32px;
  padding: 5px 12px;
  border-radius: 2px;
  border: 1px solid ${colors.gray_07};
  ${fonts.body_03}
  ${({ styles }) => styles}
  background-color: ${colors.gray_11};
  &::placeholder {
    color: ${colors.gray_06};
  }
  ${(props) =>
    props.readOnly &&
    css`
      pointer-events: none;
      & input {
        &::placeholder {
          color: ${colors.gray5};
        }
      }
    `};
`;
const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  padding-right: 6px;
  cursor: pointer;
`;
const IconCheckWrapper = styled.span`
  display: inline-flex;
  cursor: pointer;
`;
const IconClearWrapper = styled.span`
  display: inline-flex;
  padding-left: 4px;
  cursor: pointer;
`;

const InputFormStyled = styled.input`
  border-style: none;
  :focus {
    outline: none;
  }
  /* width: 100%; */
  display: inline-flex;
  flex: 1;
  ${fonts.body_02}
  color: ${colors.gray_02};
  &::placeholder {
    ${fonts.body_02}
    color: ${colors.gray6};
  }
`;
