import styled from '@emotion/styled';
import { theme as Themes } from '@common/styles';
import { css } from '@emotion/react';
import { Icon, ICON_LIST } from '../icon';
import { BUTTON_SIZE, ITextButton, ITextButtonStyled } from './Button_types';

export function TextButton({ label, onClick, isDisabled, leftIcon, rightiCon, size }: ITextButton) {
  const buttonSizeStyleds = buttonSizeStyle[size];
  return (
    <TextButtonStyled onClick={onClick} disabled={isDisabled} buttonSizeStyles={buttonSizeStyleds}>
      {leftIcon && <Icon icon={ICON_LIST[leftIcon]} width="auto" />}
      <span>{label}</span>
      {rightiCon && <Icon icon={ICON_LIST[rightiCon]} width="auto" />}
    </TextButtonStyled>
  );
}

TextButton.defaultProps = {
  isDisabled: false,
};

const TextButtonStyled = styled.button<ITextButtonStyled>`
  ${(props) => props.buttonSizeStyles}
  ${Themes.cssx.flexStart}
`;

const buttonSizeStyle = {
  [BUTTON_SIZE.SMALL]: css`
    ${Themes.fonts.p1}
    img {
      width: 14px;
    }
    span {
      margin: 0 4px;
    }
  `,
  [BUTTON_SIZE.MEDIUM]: css`
    ${Themes.fonts.body_02}
    img {
      width: 14px;
    }
    span {
      margin: 0 4px;
    }
  `,
  [BUTTON_SIZE.LARGE]: css`
    ${Themes.fonts.body_01}
    img {
      width: 20px;
    }
    span {
      margin: 0 4px;
    }
  `,
};
