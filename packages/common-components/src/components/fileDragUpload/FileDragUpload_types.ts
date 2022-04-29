export interface IFileTypes {
  index: number;
  id: string;
  fileName: string;
  fileObj: File | null;
  fileUrl: string | null;
}

export interface IDefaultFiles {
  id: string;
  fileName: string;
  fileUrl: string;
}

export interface IFileDragUpload {
  id: string;
  maxLength: number;
  defaultFile?: IDefaultFiles[];
  onChange: (files: IFileTypes[]) => void;
  onClickFile?: (id: string, fileName: string) => void;
  disabled: boolean;
  label: string;
  isClear: boolean;
}

export interface IUseFileDrag {
  maxLength: number;
  defaultFile?: IDefaultFiles[];
  disabled: boolean;
  isClear: boolean;
  changeCallback: (files: IFileTypes[]) => void;
}
