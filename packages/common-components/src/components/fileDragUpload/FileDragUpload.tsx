import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { isEmpty, isNull } from 'lodash';
import { ChangeEvent } from 'react';

import { Button, BUTTON_SIZE, BUTTON_THEME } from '../button';
import { Icon, ICON_LIST } from '../icon';

import { IFileDragUpload, IFileTypes } from './FileDragUpload_types';
import { useFileDragUpload } from './useFileDragUpload';

import { theme as Themes, colors, fonts, cssx } from '@common/styles';

export function FileDragUpload({
  id,
  maxLength,
  defaultFile,
  onChange,
  onClickFile,
  disabled,
  label,
  isClear, //true이면 초기화
}: IFileDragUpload) {
  const changeCallback = (files: IFileTypes[]) => {
    // console.log('file callback', files);
    onChange(files);
  };

  const { isDragging, fileInputRef, dragRef, files, handleFilterFile, onChangeFiles } =
    useFileDragUpload({
      maxLength,
      defaultFile,
      disabled,
      isClear,
      changeCallback,
    });

  const fileClickHandler = (id: string, fileName: string) => {
    if (disabled && !isEmpty(id) && onClickFile) {
      onClickFile(id, fileName);
    }
  };

  // const changeHandler = (e: ChangeEvent<HTMLInputElement> | any) => {
  //   const files = onChangeFiles(e);
  //   console.log('files', files);
  //   if (files) onChange(files);
  // };

  // const filterFileHandler = (index: number) => {
  //   const files = handleFilterFile(index);
  //   onChange(files);
  // };

  return (
    <>
      <FileDragStyled disabled={disabled} haveFile={files.length > 0}>
        <input
          name={id}
          ref={fileInputRef}
          type="file"
          id={id}
          accept=".pdf"
          style={{ display: 'none' }}
          multiple={maxLength > 1}
          onChange={onChangeFiles}
          disabled={disabled}
        />
        <InputLabelStyled
          htmlFor={id}
          ref={dragRef}
          haveFile={files.length > 0}
          isDragging={isDragging}
        >
          {!disabled ? (
            <>
              <Icon icon={ICON_LIST['icn_addfile']} width="24px" />
              <span>{label}</span>
            </>
          ) : (
            <>
              <span>Empty</span>
            </>
          )}
        </InputLabelStyled>

        <DropFilesWrapper disabled={disabled} multiple={maxLength > 1}>
          {files.length > 0 &&
            files.map((file: IFileTypes, idx) => {
              const { index, fileName, id, fileUrl } = file;
              return (
                <DropFileStyled key={idx}>
                  <div>{fileName}</div>

                  {disabled ? (
                    <FilesDownload>
                      <Button
                        label="다운로드"
                        theme={BUTTON_THEME.LINEBLACK}
                        size={BUTTON_SIZE.SMALL}
                        onClick={() => fileClickHandler(id, fileName)}
                      />
                    </FilesDownload>
                  ) : (
                    <FilesRemove onClick={() => handleFilterFile(index)}>
                      <Icon icon={ICON_LIST['icn_close_s']} width="14px" />
                    </FilesRemove>
                  )}
                </DropFileStyled>
              );
            })}
        </DropFilesWrapper>
      </FileDragStyled>
    </>
  );
}

FileDragUpload.defaultProps = {
  maxLength: 3,
  disabled: false,
  label: '마우스로 파일을 끌어오세요.',
  isClear: false,
};

export const FileDragStyled = styled.div<{ disabled: boolean; haveFile: boolean }>`
  ${({ disabled }) =>
    disabled
      ? css`
          background-color: ${Themes.colors.gray_10};
          label {
            div {
              opacity: 0.5;
            }
            /* pointer-events: none; */
          }
        `
      : css`
          background-color: ${Themes.colors.gray_11};
        `}
  position: relative;
`;

export const InputLabelStyled = styled.label<{ haveFile: boolean; isDragging: boolean }>`
  display: flex;
  cursor: default;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: auto;
  max-width: none;
  justify-content: center;
  ${({ haveFile }) =>
    haveFile &&
    css`
      opacity: 0.001;
    `}
  flex-grow: 0;
  border-radius: 2px;
  border: solid 1px ${colors.gray_07};

  justify-content: center;
  align-items: center;
  border: none;

  span {
    height: 20px;
    ${fonts.body_03};
    color: ${colors.gray_05};
    text-decoration: none;
  }

  .file-types {
    display: none;
  }

  ${({ isDragging, theme }) =>
    isDragging
      ? css`
          background-color: ${colors.gray1};
        `
      : css``}/* "파일 첨부" 부분 */
  /* 드래그 중일떄와 아닐 때 스타일 */
`;

export const DropFilesWrapper = styled.ul<{ disabled: boolean; multiple: boolean }>`
  padding: 12px;
  border-radius: 2px;
  border: solid 1px ${colors.gray_07};
  /* background-color: ${colors.gray_11}; */
  list-style: none;
  overflow-y: auto;
  /* pointer-events: ${(props) => (props.disabled ? 'none' : '')}; */
  ${({ multiple }) =>
    multiple
      ? css`
          height: 200px;
        `
      : css`
          height: 60px;
        `}/* margin-top: 1rem;
  & > div {
    width: 300px;
    padding: 8px;
    border: 1px solid black;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  } */
`;

export const DropFileStyled = styled.li`
  height: 32px;
  padding: 6px 8px;
  ${({ theme }) => css`
    ${cssx.flexBtw}
    ${fonts.body_03}
    background-color: ${colors.gray_10};
    color: ${colors.ays_sub_01};
  `}

  & + li {
    margin-top: 4px;
  }

  div {
    flex: 1;
    margin-right: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 1;
  }

  span {
    position: relative;
    cursor: pointer;
    z-index: 1;
  }
`;

const FilesRemove = styled.span`
  width: 14px;
  height: 14px;
`;
const FilesDownload = styled.span``;
