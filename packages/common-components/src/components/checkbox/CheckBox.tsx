import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import { ICheckBoxProps, IValue } from './CheckBox_types';
import { Icon, ICON_LIST } from '../icon';
import { theme as Themes } from '@common/styles';
import { CHECKBOX_TXT_SIZE } from './CheckBox_types';

export function CheckBox({
  label,
  isChecked,
  value,
  disabled,
  suffixIcon,
  onChange,
  onClickSuffix,
  textSize,
}: ICheckBoxProps) {
  const textstyle = textStyle[textSize];

  const onCheckItem = () => {
    onChange(value);
  };

  const icon = disabled
    ? isChecked
      ? ICON_LIST.icn_checkbox_dis
      : ICON_LIST.icn_nocheckbox_dis
    : isChecked
    ? ICON_LIST.icn_checkbox
    : ICON_LIST.icn_nocheckbox;

  return (
    <CheckboxWrapper>
      <CheckboxStyled icon={icon}>
        <input
          onChange={onCheckItem}
          checked={isChecked}
          type="checkbox"
          value={value}
          disabled={disabled}
          data-testid="checkboxInput"
        />
        <ContentWrapper>
          <Content textStyle={textstyle}>{label}</Content>
        </ContentWrapper>
      </CheckboxStyled>
      {suffixIcon && (
        <span onClick={onClickSuffix}>
          <Icon icon={suffixIcon} width={'14px'} />
        </span>
      )}
    </CheckboxWrapper>
  );
}

CheckBox.defaultProps = {
  disabled: false,
  textSize: CHECKBOX_TXT_SIZE.DEFAULT,
  isChecked: false,
  value: 'checkBox',
  onChange: () => console.log('clicked checkBox'),
};

const textStyle = {
  [CHECKBOX_TXT_SIZE.SMALL]: css`
    ${Themes.fonts.body_03}
    color: ${Themes.colors.gray_02};
  `,
  [CHECKBOX_TXT_SIZE.DEFAULT]: css`
    ${Themes.fonts.body_02}
    color: ${Themes.colors.gray_02};
  `,
  [CHECKBOX_TXT_SIZE.BOLD]: css`
    ${Themes.fonts.body_02_b}
    color: ${Themes.colors.gray_01};
  `,
};
const CheckboxWrapper = styled.div`
  ${Themes.cssx.flexBtw}
`;

const CheckboxStyled = styled.label`
  ${Themes.cssx.flexCenter}
  margin-bottom: 10px;
  cursor: pointer;
  ${({ icon }: IValue) =>
    css`
      background: url(${icon}) no-repeat 0 50% / contain;
      background-size: 18px;
    `}
  input {
    width: 18px;
    height: 18px;
    opacity: 0.001;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  margin-left: 6px;
`;
const Content = styled.div<{ textStyle: SerializedStyles }>`
  ${(props) => props.textStyle}
`;
