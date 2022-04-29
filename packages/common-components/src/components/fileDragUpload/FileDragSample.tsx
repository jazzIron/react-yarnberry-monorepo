import styled from '@emotion/styled';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
interface IFileTypes {
  id: number;
  fileObj: File;
}

export function FileDragSample() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<IFileTypes[]>([]);

  const fileId = useRef<number>(0);

  const dragRef = useRef<HTMLLabelElement | null>(null);

  // ========== file event ======================
  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: IFileTypes[] = files;
      // temp 변수를 이용하여 선택했던 파일들을 담습니다.

      // 드래그 했을 때와 안했을 때 가리키는 파일 배열을 다르게 해줍니다.
      if (e.type === 'drop') {
        // 드래그 앤 드롭 했을때
        selectFiles = e.dataTransfer.files;
      } else {
        // "파일 첨부" 버튼을 눌러서 이미지를 선택했을때
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        // 스프레드 연산자를 이용하여 기존에 있던 파일들을 복사하고, 선택했던 파일들을 append 해줍니다.
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++, // fileId의 값을 1씩 늘려주면서 각 파일의 고유값으로 사용합니다.
            fileObj: file, // object 객체안에 선택했던 파일들의 정보가 담겨있습니다.
          },
        ];
      }

      setFiles(tempFiles);
    },
    [files],
  );

  const handleFilterFile = useCallback(
    (id: number): void => {
      setFiles(files.filter((file) => file.id !== id));
    },
    [files],
  );

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

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles],
  );

  const initDragEvents = useCallback((): void => {
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn);
      dragRef.current.addEventListener('dragleave', handleDragOut);
      dragRef.current.addEventListener('dragover', handleDragOver);
      dragRef.current.addEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)

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

  return (
    <>
      <FileDragStyled>
        <input type="file" id="fileUpload" style={{ display: 'none' }} multiple={true} />
        <InputLabelStyled isDragging={isDragging} htmlFor="fileUpload" ref={dragRef}>
          파일 첨부
        </InputLabelStyled>
      </FileDragStyled>

      <DragDropFiles>
        {files.length > 0 &&
          files.map((file: IFileTypes) => {
            const { id, fileObj } = file;

            return (
              <div key={id}>
                <div>{fileObj.name}</div>
                <DragDropFileFilter onClick={() => handleFilterFile(id)}>X</DragDropFileFilter>
              </div>
            );
          })}
      </DragDropFiles>
    </>
  );
}

const FileDragStyled = styled.div`
  width: 100%;
  height: 100px;
  background: pink;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -ms-flex-direction: column;
  justify-content: center;
  align-items: center;
  &-File {
    width: 400px;
    height: 200px;
    border: 2px solid black;
    border-radius: 10px;

    @include alignCenter();
    /* cursor: pointer; */
    transition: 0.12s ease-in;

    &-Dragging {
      @include filledStyle();
    }
  }
`;

const InputLabelStyled = styled.label<{ isDragging: boolean }>`
  width: 100%;
  height: 100%;
  cursor: default;
  /* "파일 첨부" 부분 */
  /* 드래그 중일떄와 아닐 때 스타일 */
`;

const DragDropFiles = styled.div`
  margin-top: 1rem;

  & > div {
    width: 300px;
    padding: 8px;
    border: 1px solid black;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
`;

const DragDropFileFilter = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
