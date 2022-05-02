export interface IListPagination {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  size: number;
  first: boolean;
  last: boolean;
}

export const dataToPaginationData = (data: IListPagination) => {
  return { ...data, pageNumber: data.pageNumber + 1 };
};
