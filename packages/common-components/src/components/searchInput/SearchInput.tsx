import styled from '@emotion/styled';
import { theme as Themes, colors } from '@common/styles';
import { MouseEvent, useRef } from 'react';
import { SearchInputPropTypes } from './Search_types';
import { ICON_LIST } from '../icon';

export function SearchInput({
  inputValue,
  placeholder,
  allowClear,
  maxLength,
  onChange,
  onFocus,
  onBlur,
  onSubmit,
}: SearchInputPropTypes) {
  const IconSize = '14px';
  const inputRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent<HTMLInputElement>) => e.preventDefault();
  const handleSearchSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return onSubmit(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const maxInput = maxLength ? maxLength : 0;
    if (maxInput > 0) {
      return onChange(value.slice(0, maxInput));
    }
    onChange(value);
  };

  const handleCheckEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit(inputValue);
  };

  const handleClickAllowClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChange('');
  };

  return (
    <SearchInputWrapper ref={inputRef}>
      <SearchInputFormWrapper>
        <SearchInputStyled
          value={inputValue}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyPress={handleCheckEnter}
        />
        {allowClear && inputValue && (
          <IconClearWrapper onClick={handleClickAllowClear} onMouseDown={handleMouseDown}>
            <img src={ICON_LIST['icn_clean']} width={IconSize} alt="icn_clean" />
          </IconClearWrapper>
        )}
        <SearchIconStyled onClick={handleSearchSubmit} onMouseDown={handleMouseDown}>
          <img src={ICON_LIST['icn_search']} width={20} alt={'icn_search'} />
        </SearchIconStyled>
      </SearchInputFormWrapper>
    </SearchInputWrapper>
  );
}

SearchInput.defaultProps = {
  placeholder: '검색어를 입력해 주세요.',
  inputValue: '',
  allowClear: true,
  maxLength: 100,
  onFocus: () => true,
  onBlur: () => true,
};

const SearchInputWrapper = styled.div`
  height: 32px;
`;

const SearchInputFormWrapper = styled.div`
  display: flex;
  padding: 8px 16px;
  border-radius: 2px;
  background-color: ${colors.gray_11};
  justify-content: space-between;
  gap: 8px;
`;

const SearchInputStyled = styled.input`
  ${Themes.fonts.body_01};
  border: none;
  :focus {
    outline: none;
  }
  flex-grow: 2;
`;
const SearchIconStyled = styled.span`
  display: inline-flex;
  cursor: pointer;
`;

const IconClearWrapper = styled.span`
  display: inline-flex;
  cursor: pointer;
`;
