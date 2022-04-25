import styled from '@emotion/styled';
import { useState } from 'react';
import { css } from '@emotion/react';
import { ISwitch, ISwitchBox, SWITCH_THEME } from './Switch_types';
import { theme as Themes, colors } from '@common/styles';
export function Switch({ label, value, disabled, onClick, theme }: ISwitch) {
  const [on, setOn] = useState(false);
  const themeColor = switchThemeStyle[theme];

  const onSwitch = () => {
    if (!disabled) {
      onClick({ [value]: !on });
      setOn(!on);
    }
  };
  return (
    <SwitchStyled disabled={disabled}>
      {label && <Label>{label}</Label>}
      <SwitchBox onClick={onSwitch} onSwitch={on} disabled={disabled} themeColor={themeColor}>
        <SwitchButton onSwitch={on} />
      </SwitchBox>
    </SwitchStyled>
  );
}

Switch.defaultProps = {
  disabled: false,
  theme: SWITCH_THEME.DEFAULT,
};
const SwitchStyled = styled.div<{ disabled: boolean }>`
  width: 100%;
  height: 60px;
  padding: 10px;
  ${Themes.cssx.flexBtw}
`;
const Label = styled.div`
  ${Themes.fonts.h4_B}
`;
const SwitchBox = styled.div<ISwitchBox>`
  position: relative;
  width: 43px;
  height: 24px;
  border-radius: 30px;
  background: ${(props) =>
    props.disabled ? Themes.colors.gray1 : props.onSwitch ? Themes.colors.gray1 : props.themeColor};
  cursor: pointer;
`;
const SwitchButton = styled.div<{ onSwitch: boolean }>`
  position: absolute;
  width: 20px;
  height: 20px;
  margin: 2px;
  background: ${colors.gray_11};
  border-radius: 50%;
  cursor: pointer;
  ${(props) =>
    props.onSwitch
      ? css`
          left: 0px;
        `
      : css`
          right: 0px;
        `}
`;

const switchThemeStyle = {
  [SWITCH_THEME.DEFAULT]: `${colors.ays_maincolor}
  `,
  [SWITCH_THEME.RED]: `${colors.red1}`,
};
