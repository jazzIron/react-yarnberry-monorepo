import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import { ISelectOption } from './Select_types';
import { theme as Themes, colors, cssx } from '@common/styles';

export function SelectOption({ size, options, onChange }: ISelectOption) {
  return (
    <DropDownListWrapper>
      <DropDownListStyled>
        {options.map((option) => (
          <ListItem
            sizeStyle={size}
            onClick={() => onChange(option)}
            key={option.id}
            disabled={option.disabled}
          >
            {option.label}
          </ListItem>
        ))}
      </DropDownListStyled>
    </DropDownListWrapper>
  );
}

const DropDownListWrapper = styled.div`
  position: absolute;
  width: max-content;
  min-width: 100%;
  max-width: 150%;
  z-index: 1;
`;

const DropDownListStyled = styled.ul`
  padding: 4px 0;
  border-radius: 2px;
  box-shadow: 0 9px 28px 8px rgba(0, 0, 0, 0.05), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12);
  background-color: ${colors.gray_11};
  &:first-of-type {
    border-top: 0;
  }
`;

const ListItem = styled.li<{ sizeStyle: SerializedStyles; disabled: boolean }>`
  ${cssx.flexStart}
  ${(props) => props.sizeStyle};
  min-height: 32px;
  height: auto;
  gap: 8px;
  padding: 6px 14px;
  cursor: pointer;
  word-break: break-word;
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.4;
      pointer-events: none;
    `}
  &:hover {
    background-color: ${colors.bg_skyblue};
  }
`;
