import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import { ChangeEvent, useState } from 'react';
import { ITextarea, TEXTAREA_THEME } from './Textarea_types';
import { Icon, ICON_LIST } from '../icon';
import { theme as Themes, colors, fonts } from '@common/styles';

export function Textarea({
  theme,
  disabled,
  placeholder,
  value,
  maxLength,
  readOnly,
  rows,
  isRemove,
  onChange,
}: ITextarea) {
  const [tLength, setTLength] = useState(value.length);
  const themeStyle = textAreaTheme[theme];
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    setTLength(e.target.value.length);
  };

  const clearHandler = () => {
    onChange('');
    setTLength(0);
  };

  return (
    <TextareaWrapper>
      <TextAreaStyled
        themeStyle={themeStyle}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        readOnly={readOnly}
        rows={rows}
        onChange={onChangeHandler}
      />
      {isRemove && (
        <IconWapper onClick={clearHandler}>
          <Icon icon={ICON_LIST['icn_clean']} width={'14px'} />
        </IconWapper>
      )}
      <TextareaLength>
        {tLength} / {maxLength}
      </TextareaLength>
    </TextareaWrapper>
  );
}

Textarea.defaultProps = {
  theme: TEXTAREA_THEME.BORDER,
  placeholder: '입력해주세요.',
  maxLength: 500,
  isRemove: false,
  readOnly: false,
  disabled: false,
  rows: 5,
  value: '',
};

interface ITextAreaStyled {
  themeStyle: SerializedStyles;
}

const textAreaTheme = {
  [TEXTAREA_THEME.BORDER]: css`
    border: solid 1px ${colors.gray_07};
  `,
};

const TextareaWrapper = styled.div`
  position: relative;
  font-size: 0;
`;
const TextAreaStyled = styled.textarea<ITextAreaStyled>`
  width: 100%;
  resize: none;
  padding: 6px 12px;
  ${fonts.body_02}
  color: ${colors.gray_02};
  border-radius: 2px;
  ${(props) => props.themeStyle}
`;
const TextareaLength = styled.div`
  text-align: right;
  ${fonts.body_03}
  color: ${colors.gray6};
`;
const IconWapper = styled.div`
  position: absolute;
  right: 12px;
  top: 9px;
  cursor: pointer;
`;
