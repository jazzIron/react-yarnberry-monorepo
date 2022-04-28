import { debounce } from 'lodash';
import { useState } from 'react';
import { IPaging } from './Pagenation_types';

interface IPageElement {
  totalElements: number;
  pageCount: number;
  size: number;
  pageNumber: number;
}

interface propsTypes {
  paging: IPaging;
  onClick: (val: number) => void;
}

export default function usePagenation({ paging, onClick }: propsTypes) {
  const [pageData, setPageData] = useState<number[]>([]);
  const [totalPage, setTotalPage] = useState(0);

  const pageElement = ({ totalElements, pageCount, size, pageNumber }: IPageElement) => {
    let firstPageNumber = 0;
    const totalPage = Math.ceil(totalElements / size); //총 페이지 수
    if (totalPage < pageCount) {
      pageCount = totalPage;
    }
    const pageGroup = Math.ceil(pageNumber / pageCount); // 페이지
    let lastPageNumber = pageGroup * pageCount; //마지막 페이지 번호
    lastPageNumber = lastPageNumber > totalPage ? totalPage : lastPageNumber;
    firstPageNumber = lastPageNumber <= 0 ? 1 : lastPageNumber - (pageCount - 1); //첫번째 페이지 번호

    let pageElement = [];
    for (let i = firstPageNumber; i <= lastPageNumber; i++) {
      if (i === 0) continue;
      pageElement.push(i);
    }
    pageElement = pageElement.length <= 0 ? [1] : pageElement; // 페이지가 없는 경우 기본 1로 설정

    setTotalPage(totalPage);
    setPageData(pageElement);
  };

  const handleFirstPage = debounce(() => {
    if (paging.pageNumber <= 1) return false;
    return onClick(1);
  }, 100);

  const handlePrevPage = debounce(() => {
    if (paging.pageNumber <= 1) return false;
    const prevPageNum = Number(paging.pageNumber) - 1;
    return onClick(prevPageNum);
  }, 100);

  const handleLastPage = debounce(() => {
    if (paging.pageNumber === totalPage || paging.last) return false;
    return onClick(totalPage);
  }, 100);

  const handleNextPage = debounce(() => {
    if (paging.pageNumber === totalPage || paging.last) return false;
    const nextPageNum = Number(paging.pageNumber) + 1;
    return onClick(nextPageNum);
  }, 100);

  const handleClickPage = debounce((value: number) => {
    if (paging.pageNumber === value) return false;
    return onClick(value);
  }, 100);

  return {
    pageData,
    pageElement,
    handleFirstPage,
    handlePrevPage,
    handleLastPage,
    handleNextPage,
    handleClickPage,
  };
}
