import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { theme as Themes, cssx } from '@common/styles';

import { Icon, ICON_LIST } from '../icon';

import { ILabel, LABEL_THEME, LABEL_COLOR } from './Label_types';

export function Label({ theme, color, options, isRemove, onRemove }: ILabel) {
  const themeStyle = LabelTheme[theme];
  const themeColor =
    theme === LABEL_THEME.ROUND ? LabelRoundColor[color] : LabelDefaultColor[color];
  const newOptions = options.filter((option) => option.hidden === false);

  return (
    <LabelWrapper>
      {newOptions.map((option) => {
        return (
          <LabelStyled key={option.id} themeStyle={themeStyle} themeColor={themeColor}>
            {option.label} {option.hidden}
            {isRemove && (
              <IconWrapper onClick={(e) => onRemove(option.id)}>
                {theme === 'DEFAULT' && <Icon icon={ICON_LIST['icn_x_14_gray']} width="14px" />}
                {theme === 'REMOVE' && <Icon icon={ICON_LIST['icn_close_s']} width="14px" />}
                {theme === 'ROUND' && <Icon icon={ICON_LIST['icn_x_20_gray']} width="20px" />}
              </IconWrapper>
            )}
          </LabelStyled>
        );
      })}
    </LabelWrapper>
  );
}

Label.defaultProps = {
  theme: LABEL_THEME.DEFAULT,
  color: LABEL_COLOR.BLUE,
  isRemove: false,
  onRemove: () => true,
};

const LabelTheme = {
  [LABEL_THEME.ROUND]: css`
    color: ${Themes.colors.gray_11};
    width: fit-content;
    height: 32px;
    padding: 4px 16px;
    border-radius: 16px;
    ${Themes.fonts.body_01_b}
    text-align: left;
  `,
  [LABEL_THEME.DEFAULT]: css`
    width: fit-content;
    height: 24px;
    object-fit: contain;
    padding: 2px 6px;
    border-radius: 2px;
    ${Themes.fonts.body_03}
    text-align: left;
  `,
  [LABEL_THEME.REMOVE]: css`
    width: fit-content;
    height: 32px;
    object-fit: contain;
    padding: 6px 10px;
    border-radius: 2px;
    ${Themes.fonts.body_03_b}
    text-align: left;
  `,
};

const LabelDefaultColor = {
  [LABEL_COLOR.RED]: css`
    background-color: ${Themes.colors.bg_red};
    color: ${Themes.colors.ays_point_01};
  `,
  [LABEL_COLOR.BLUE]: css`
    background-color: ${Themes.colors.bg_blue};
    color: ${Themes.colors.ays_sub_01};
  `,
  [LABEL_COLOR.YELLOW]: css`
    background-color: ${Themes.colors.ays_point_02};
    color: ${Themes.colors.ays_sub_01};
  `,
};

const LabelRoundColor = {
  [LABEL_COLOR.RED]: css`
    background-color: ${Themes.colors.ays_point_01};
  `,
  [LABEL_COLOR.BLUE]: css`
    background-color: ${Themes.colors.ays_sub_01};
  `,
  [LABEL_COLOR.YELLOW]: css`
    background-color: ${Themes.colors.ays_point_02};
  `,
};

interface ILabelStyled {
  themeStyle: SerializedStyles;
  themeColor: SerializedStyles;
}

const LabelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;
const LabelStyled = styled.div<ILabelStyled>`
  ${Themes.cssx.flexCenter};
  ${(props) => props.themeStyle};
  ${(props) => props.themeColor};
  gap: 10px;
`;
const IconWrapper = styled.button`
  margin-left: -1px;
  position: relative;
  top: 2px;
`;
