import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import { ChangeEvent, MouseEvent, MouseEventHandler } from 'react';
import { IRadioGroup, RADIO_SIZE, RADIO_THEME } from './Radio_types';
import { theme as Themes, cssx } from '@common/styles';

const radioBorderStyled = (checked: boolean, disabled: boolean): SerializedStyles => {
  const borderColor = disabled ? Themes.colors.gray_07 : Themes.colors.ays_maincolor;
  const bgColor = disabled ? Themes.colors.gray_10 : Themes.colors.gray_11;
  return css`
    border: solid 1px ${checked ? borderColor : Themes.colors.gray_07};
    background-color: ${checked ? Themes.colors.gray_11 : bgColor};
  `;
};

const radioCheckStyled = (checked: boolean, disabled: boolean): SerializedStyles => {
  if (!checked) return css``;
  return css`
    ::after {
      content: '';
      width: 10px;
      height: 10px;
      background-color: ${disabled ? Themes.colors.gray_07 : Themes.colors.ays_maincolor};
      position: absolute;
      border-radius: 50%;
      left: 4px;
      top: 4px;
    }
  `;
};

const borderStyled = (disabled: boolean, checked: boolean) => {
  const borderColor = disabled
    ? Themes.colors.gray_07
    : checked
    ? Themes.colors.ays_maincolor
    : Themes.colors.gray_07;
  const fontColor = disabled
    ? Themes.colors.gray_07
    : checked
    ? Themes.colors.ays_maincolor
    : Themes.colors.gray_02;
  return css`
    border: 1px solid ${borderColor};
    color: ${fontColor};
  `;
};

export function Radio({ theme, size, options, value, gap, onChange }: IRadioGroup) {
  const themeType = theme;
  const fontType: SerializedStyles = size === 'SMALL' ? Themes.fonts.body_03 : Themes.fonts.body_02;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    return onChange(e.target.value);
  };

  const onClickHandler = (value: string) => {
    onChange(value);
  };

  return (
    <RadioWrapper gap={gap}>
      {options.map((option, idx) => {
        const checked = value === option.value;
        const radioCheckStyle: SerializedStyles = radioCheckStyled(checked, option.disabled);
        const radioBorderStyle = radioBorderStyled(checked, option.disabled);

        const borderStyle =
          theme === RADIO_THEME.BUTTON ? borderStyled(option.disabled, checked) : css``;

        return (
          <InputLabelWrapper
            key={idx}
            themeType={themeType}
            fontType={fontType}
            borderStyle={borderStyle}
          >
            <RadioStyled>
              <RadioItem
                type="radio"
                id={option.id}
                value={option.value}
                checked={value === option.value}
                onChange={onChangeHandler}
                disabled={option.disabled}
                onClick={() => onClickHandler(option.value)}
              />
              {theme === RADIO_THEME.DEFAULT && (
                <RadioItemWrapper
                  radioBorderStyle={radioBorderStyle}
                  radioCheckStyle={radioCheckStyle}
                />
              )}
            </RadioStyled>
            <InputLabelStyled themeType={themeType} disabled={option.disabled}>
              {option.label}
            </InputLabelStyled>
          </InputLabelWrapper>
        );
      })}
    </RadioWrapper>
  );
}

Radio.defaultProps = {
  theme: RADIO_THEME.DEFAULT,
  size: RADIO_SIZE.SMALL,
  options: [],
  gap: '7',
};

interface IInputLabelWrapper {
  fontType: SerializedStyles;
  themeType: string;
  borderStyle: SerializedStyles;
}

const RadioWrapper = styled.div<{ gap: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.gap}px;
`;

const InputLabelWrapper = styled.label<IInputLabelWrapper>`
  ${cssx.flexCenter}
  color: ${Themes.colors.gray_02};
  ${(props) => props.fontType}
  ${(props) => {
    return props.themeType === RADIO_THEME.BUTTON
      ? css`
          ${props.borderStyle};
          padding: 6px 10px;
          height: 32px;
          border-radius: 2px;
          background-color: ${Themes.colors.gray_11};
          ${Themes.fonts.body_03}
        `
      : css``;
  }}
`;

const RadioStyled = styled.span`
  position: relative;
  display: flex;
`;

const RadioItem = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0.00001;
`;

const RadioItemWrapper = styled.span<{
  radioBorderStyle: SerializedStyles;
  radioCheckStyle: SerializedStyles;
}>`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  ${(props) => props.radioCheckStyle};
  ${(props) => props.radioBorderStyle};
`;

const InputLabelStyled = styled.span<{ themeType: string; disabled: boolean }>`
  ${(props) => {
    return props.themeType === RADIO_THEME.DEFAULT
      ? css`
          padding-left: 6px;
          color: ${props.disabled ? Themes.colors.gray_05 : Themes.colors.gray_02};
        `
      : css``;
  }}
`;
