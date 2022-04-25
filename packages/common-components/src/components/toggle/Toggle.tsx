import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import { IToggle, TOGGLE_SIZE } from './Toggle_types';
import { theme as Themes, colors } from '@common/styles';

export function Toggle({
  size,
  checked,
  disabled,
  checkedChildren,
  unCheckedChildren,
  onChange,
}: IToggle) {
  const onChangeHandler = () => {
    onChange(!checked);
  };

  return (
    <ToggleWrapper>
      <ToggleStyled size={size} disabled={disabled}>
        <ToggleItemStyled type="checkbox" checked={checked} onChange={onChangeHandler} />
        <ToggleItemContent checked={checked} size={size}>
          {checkedChildren && unCheckedChildren && (
            <>
              <CheckChildrenStyled>{checkedChildren}</CheckChildrenStyled>
              <CheckChildrenStyled>{unCheckedChildren}</CheckChildrenStyled>
            </>
          )}
        </ToggleItemContent>
      </ToggleStyled>
    </ToggleWrapper>
  );
}

Toggle.defaultProps = {
  size: TOGGLE_SIZE.MEDIUM,
  checked: false,
  disabled: false,
  checkedChildren: '진료 ON',
  unCheckedChildren: '진료 OFF',
};

const ToggleWrapper = styled.div`
  line-height: 0;
`;

const ToggleStyled = styled.label<{ size: string; disabled: boolean }>`
  position: relative;
  display: inline-block;
  /* opacity: ${(props) => (props.disabled ? '0.4' : '1')}; */
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'unset')};
  ${(props) =>
    props.size === 'SMALL'
      ? css`
          width: 75px;
          height: 24px;
        `
      : css`
          width: 75px;
          height: 24px;
        `}
  input:checked + span {
    background-color: ${colors.ays_maincolor};
  }
  input:checked + span::before {
    transform: translateX(${(props) => (props.size === 'SMALL' ? '50px' : '50px')});
  }
`;
const ToggleItemStyled = styled.input`
  display: none;
`;
const ToggleItemContent = styled.span<{ checked: boolean; size: string }>`
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.blue2};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50px;
  ::before {
    position: absolute;
    content: '';
    left: 2px;
    ${(props) =>
      props.size === 'SMALL'
        ? css`
            height: 20px;
            width: 20px;
          `
        : css`
            height: 20px;
            width: 20px;
          `}
    border-radius: 50%;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  > div:first-of-type {
    color: ${colors.gray_11};
    position: absolute;
    ${(props) =>
      props.size === 'SMALL'
        ? css`
            ${Themes.fonts.p1};
            left: 8px;
          `
        : css`
            ${Themes.fonts.p1};
            left: 8px;
          `}
    display: ${(props) => (props.checked ? 'block' : 'none')};
  }
  > div:last-of-type {
    color: ${colors.gray_11};
    position: absolute;
    ${(props) =>
      props.size === 'SMALL'
        ? css`
            ${Themes.fonts.p1};
            right: 8px;
          `
        : css`
            ${Themes.fonts.p1};
            right: 8px;
          `}
    display: ${(props) => (props.checked ? 'none' : 'block')};
  }
`;

const CheckChildrenStyled = styled.div`
  ${(props) => Themes.fonts.p1};
`;
