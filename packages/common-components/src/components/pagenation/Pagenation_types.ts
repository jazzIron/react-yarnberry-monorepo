//     static class Paging {
//        long totalElements; // 총 데이터 수
//        int totalPages; // 총 페이지 수
//        int pageNumber; // 현재 페이지 번호
//        int size; //현재 페이지 데이터 수
//        boolean first; // 첫 페이지 여부
//        boolean last; // 마지막 페이지 여부
//     }

export interface IPaging {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface IPagenation {
  paging: IPaging;
  pageCount: number;
  onClick: (pageNumber: number) => void;
}
