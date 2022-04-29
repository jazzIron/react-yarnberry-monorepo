import styled from '@emotion/styled';
import { ChangeEvent, useRef } from 'react';

import { IFileUpload } from './FileUpload_types';

export function FileUpload({ onLoadFile }: IFileUpload) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) onLoadFile(file[0]);
  };

  const onClear = () => {
    if (inputRef.current) inputRef.current.value = '';
    onLoadFile(null);
  };

  return (
    <FileUploadWrapper>
      <input type="file" ref={inputRef} onChange={onChangeHandler} />
      <span onClick={onClear}>X</span>
    </FileUploadWrapper>
  );
}

FileUpload.defaultProps = {};

const FileUploadWrapper = styled.div``;
