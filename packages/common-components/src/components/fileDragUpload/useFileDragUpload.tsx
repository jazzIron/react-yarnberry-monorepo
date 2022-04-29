import { isEmpty } from 'lodash';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { TOAST_OPTION_POSITION, TOAST_TYPE } from '../toast';
import { ToastHook } from '../toast/ToastHook';

import { IFileTypes, IUseFileDrag } from './FileDragUpload_types';

export function useFileDragUpload({
  maxLength,
  defaultFile,
  disabled,
  isClear,
  changeCallback,
}: IUseFileDrag) {
  const { toastMake } = ToastHook();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLLabelElement | null>(null);
  const [files, setFiles] = useState<IFileTypes[]>([]);
  const fileId = useRef<number>(0);

  useEffect(() => {
    if (defaultFile) {
      defaultFile.forEach((obj, idx) => {
        setFiles((prev) => [
          ...prev,
          {
            index: fileId.current++,
            id: obj.id,
            fileName: obj.fileName,
            fileObj: null,
            fileUrl: obj.fileUrl,
          },
        ]);
      });
    }
    return () => {
      setFiles([]);
      inputClear();
    };
  }, []);

  useEffect(() => {
    if (files.length >= 0 && isClear) {
      setFiles([]);
      inputClear();
    }
  }, [isClear]);

  // ========== file event ======================

  const sizeCheck = (newFileSize: number) => {
    if (files.length >= maxLength) return false;
    if (files.length + newFileSize > maxLength) return false;
    // if (newFileSize === 0) return false;
    return true;
  };

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any) => {
      let failMsg = '';

      // 드래그 사용 , "파일 첨부 버튼 사용"
      const selectFiles: File[] = e.type === 'drop' ? e.dataTransfer.files : e.target.files;
      let temp = [...files];

      if (sizeCheck(selectFiles.length)) {
        [].forEach.call(selectFiles, function (file: File, index: number) {
          if (/\.(pdf)$/i.test(file.name)) {
            //pdf만 저장
            const reader = new FileReader();
            temp = [
              ...temp,
              {
                index: fileId.current++,
                id: '',
                fileName: file.name,
                fileObj: file,
                fileUrl: reader.result as string,
              },
            ];
            reader.onloadend = () => {
              setFiles(temp);
              inputClear();
            };
            reader.readAsDataURL(file);
          } else {
            failMsg = 'pdf 파일만 등록 가능합니다.';
          }
        });
        changeCallback(temp);
        return temp;
      } else {
        failMsg = '파일 등록 수량을 초과하였습니다.';
      }
      e.target.value = '';
      setToastMsg(failMsg);
    },
    [files],
  );

  const setToastMsg = (msg: string) => {
    if (!isEmpty(msg)) {
      toastMake({
        content: msg,
        type: TOAST_TYPE.ERROR,
        options: {
          autoClose: true,
          position: TOAST_OPTION_POSITION.TOP_CENTER,
        },
      });
    }
  };

  const handleFilterFile = (index: number) => {
    const filterFiles = files.filter((file) => file.index !== index);
    setFiles(filterFiles);
    changeCallback(filterFiles);
  };

  const handleFileClear = () => {
    setFiles([]);
  };

  const inputClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.files = null;
      fileInputRef.current.value = '';
    }
  };

  // ========== drag event ======================
  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault(); //브라우저 이벤트 방지
    e.stopPropagation(); //부모 이벤트 방지
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      if (!disabled) {
        onChangeFiles(e);
        setIsDragging(false);
      }
    },
    [onChangeFiles],
  );

  const initDragEvents = useCallback((): void => {
    //  드래그 이벤트에 Listener를 등록(마운트 될 때)

    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn);
      dragRef.current.addEventListener('dragleave', handleDragOut);
      dragRef.current.addEventListener('dragover', handleDragOver);
      dragRef.current.addEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    // 드래그 이벤트에 Listener를 삭제합니다. (언마운트 될 때)

    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn);
      dragRef.current.removeEventListener('dragleave', handleDragOut);
      dragRef.current.removeEventListener('dragover', handleDragOver);
      dragRef.current.removeEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();
    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return {
    isDragging,
    fileInputRef,
    dragRef,
    files,
    handleFilterFile,
    onChangeFiles,
    handleFileClear,
  };
}
