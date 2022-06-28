import styled from '@emotion/styled';
import { theme as Themes } from '@common/styles';
import { css } from '@emotion/react';
import { Icon, ICON_LIST } from '../icon';
import { BUTTON_SIZE, ITextButton, ITextButtonStyled } from './Button_types';

export function TextButton({ label, onClick, isDisabled, leftIcon, rightIcon, size }: ITextButton) {
  const buttonSizeStyleds = buttonSizeStyle[size];

  const iconSize = size === 'LARGE' ? '20px' : '16px';

  return (
    <TextButtonStyled onClick={onClick} disabled={isDisabled} buttonSizeStyles={buttonSizeStyleds}>
      {leftIcon && <Icon icon={leftIcon} width={iconSize} />}
      <span>{label}</span>
      {rightIcon && <Icon icon={rightIcon} width={iconSize} />}
    </TextButtonStyled>
  );
}

TextButton.defaultProps = {
  isDisabled: false,
};

const TextButtonStyled = styled.button<ITextButtonStyled>`
  ${(props) => props.buttonSizeStyles};
  ${Themes.cssx.flexStart};
  gap: 4px;
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
