import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { ICON_LIST } from '../icon';
import usePagenation from './usePagenation';
import { IPagenation } from './Pagenation_types';
import { css } from '@emotion/react';
import { theme as Themes } from '@common/styles';

export function Pagenation({ paging, pageCount, onClick }: IPagenation) {
  const iconSize = '14';
  const {
    pageData,
    pageElement,
    handleFirstPage,
    handlePrevPage,
    handleLastPage,
    handleNextPage,
    handleClickPage,
  } = usePagenation({ paging, onClick });

  useEffect(() => {
    const { totalElements, size, pageNumber, totalPages } = paging;
    pageElement({ totalElements, pageCount, size, pageNumber });
  }, [paging]);

  return (
    <PagenationStyled>
      <LeftItem>
        <FirstPageStyled onClick={handleFirstPage}>
          <img src={ICON_LIST['icn_first']} width={iconSize} alt="icn_first" />
        </FirstPageStyled>
        <PrevPageStyled onClick={handlePrevPage}>
          <img src={ICON_LIST['icn_prev']} width={iconSize} alt="icn_prev" />
        </PrevPageStyled>
      </LeftItem>
      <CenterItem>
        {pageData &&
          pageData.map((value: number) => {
            const hasActive = value === paging.pageNumber || paging.pageNumber === 0 ? true : false;
            return (
              <PageButtonItem key={value} onClick={() => handleClickPage(value)} active={hasActive}>
                {value}
              </PageButtonItem>
            );
          })}
      </CenterItem>
      <RightItem>
        <NextPageStyled onClick={handleNextPage}>
          <img src={ICON_LIST['icn_next']} width={iconSize} alt="icn_next" />
        </NextPageStyled>
        <LastPageStyled onClick={handleLastPage}>
          <img src={ICON_LIST['icn_last']} width={iconSize} alt="icn_first" />
        </LastPageStyled>
      </RightItem>
    </PagenationStyled>
  );
}

Pagenation.defaultProps = {
  pageCount: 10,
};

const PagenationStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px 0px 50px;
  img {
    cursor: pointer;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
`;

const LeftItem = styled.div`
  padding-right: 20px;
  > div {
    width: 30px;
    height: 30px;
    display: inline-block;
    padding: 8px;
  }
`;
const FirstPageStyled = styled.div`
  padding-right: 4px;
`;
const PrevPageStyled = styled.div``;

const CenterItem = styled.div`
  display: flex;
  gap: 10px;
`;

const PageButtonItem = styled.button<{ active: boolean }>`
  padding: 4px 10px;
  border-radius: 2px;
  ${(props) => props.active && Themes.fonts.body_02_b};
  // color: ${(props) => props.active && Themes.colors.gray_03};
  // background-color: ${(props) => props.active && Themes.colors.gray_11};
  ${(props) => {
    return props.active === true
      ? css`
          color: ${Themes.colors.gray_11};
          background-color: ${Themes.colors.gray_04};
        `
      : css`
          color: ${Themes.colors.gray_03};
          background-color: transparent;
        `;
  }}
`;

const RightItem = styled.div`
  padding-left: 20px;
  > div {
    width: 30px;
    height: 30px;
    display: inline-block;
    padding: 8px;
  }
`;
const LastPageStyled = styled.div`
  padding-left: 4px;
`;
const NextPageStyled = styled.div``;
