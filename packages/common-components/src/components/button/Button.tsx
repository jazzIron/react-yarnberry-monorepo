import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme as Themes } from '@common/styles';
// import { Icon, ICON_LIST } from '../icon';
import { BUTTON_SIZE, BUTTON_THEME, IButton, IButtonStyled } from './Button_types';

export function Button({
  label,
  type,
  onClick,
  isDisabled,
  theme,
  size,
  styleBlock,
  icon,
}: IButton) {
  const buttonThemeStyles = buttonThemeStyle[theme];
  const buttonSizeStyleds = buttonSizeStyle[size];

  return (
    <ButtonStyled
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      styleBlock={styleBlock}
      buttonThemeStyles={buttonThemeStyles}
      buttonSizeStyles={buttonSizeStyleds}
    >
      {/* {icon && <Icon icon={ICON_LIST[icon]} />} */}
      {label}
    </ButtonStyled>
  );
}

Button.defaultProps = {
  type: 'button',
  styleBlock: false,
  isDisabled: false,
  theme: BUTTON_THEME.PRIMARY,
  size: BUTTON_SIZE.MEDIUM,
  icon: null,
};

const ButtonStyled = styled.button<IButtonStyled>`
  border-radius: 2px;
  ${(props) => props.buttonThemeStyles}
  ${(props) => props.buttonSizeStyles}
  img {
    width: 16px;
    margin-right: 6px;
  }
  ${({ styleBlock }) =>
    styleBlock
      ? css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        `
      : css`
          display: inline-flex;
          justify-content: center;
          align-items: center;
        `}
`;

const buttonThemeStyle = {
  [BUTTON_THEME.PRIMARY]: css`
    background-color: ${Themes.colors.ays_maincolor};
    color: ${Themes.colors.gray_11};
    :hover {
      background-color: ${Themes.colors.blue1};
    }
    :disabled {
      background-color: ${Themes.colors.gray_07};
      color: ${Themes.colors.gray_11};
    }
  `,
  [BUTTON_THEME.LINEBLUE]: css`
    background-color: ${Themes.colors.gray_11};
    color: ${Themes.colors.ays_maincolor};
    border: 1px solid ${Themes.colors.ays_maincolor};
    :hover {
      background-color: ${Themes.colors.bg_skyblue};
      border-color: ${Themes.colors.blue1};
      color: ${Themes.colors.blue1};
    }
    :disabled {
      background-color: ${Themes.colors.gray_10};
      color: ${Themes.colors.gray_07};
      border-color: ${Themes.colors.gray_07};
    }
  `,
  [BUTTON_THEME.LINEBLACK]: css`
    background-color: ${Themes.colors.gray_11};
    color: ${Themes.colors.gray_02};
    border: solid 1px ${Themes.colors.gray_07};
    :hover {
      background-color: ${Themes.colors.bg_gray};
      color: ${Themes.colors.gray_02};
      border: solid 1px ${Themes.colors.gray_07};
    }
    :disabled {
      background-color: ${Themes.colors.gray_10};
      color: ${Themes.colors.gray_07};
      border-color: ${Themes.colors.gray_07};
    }
  `,
  [BUTTON_THEME.LINERED]: css`
    background-color: ${Themes.colors.gray_11};
    color: ${Themes.colors.ays_point_01};
    border: solid 1px ${Themes.colors.gray_07};
    :hover {
      background-color: ${Themes.colors.bg_gray};
      color: ${Themes.colors.ays_point_01};
      border: solid 1px ${Themes.colors.gray_07};
    }
    :disabled {
      background-color: ${Themes.colors.gray_10};
      color: ${Themes.colors.gray_07};
      border-color: ${Themes.colors.gray_07};
    }
  `,
  [BUTTON_THEME.NEGATIVE]: css`
    background-color: ${Themes.colors.ays_point_03};
    color: ${Themes.colors.gray_11};
    :hover {
      background-color: ${Themes.colors.red2};
    }
    :disabled {
      background-color: ${Themes.colors.gray_07};
      color: ${Themes.colors.gray_11};
    }
  `,
};

const buttonSizeStyle = {
  [BUTTON_SIZE.SMALL]: css`
    height: 24px;
    padding: 3px 10px;
    ${Themes.fonts.p1}
  `,
  [BUTTON_SIZE.MEDIUM]: css`
    height: 32px;
    padding: 6px 10px;
    ${Themes.fonts.body_03}
  `,
  [BUTTON_SIZE.LARGE]: css`
    min-width: 100px;
    height: 42px;
    /*padding: 10px; */
    padding: 10px 24px;
    ${Themes.fonts.body_02}
  `,
};
