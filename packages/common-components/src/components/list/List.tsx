import styled from '@emotion/styled';
import { IList, LIST_SIZE, IListItem } from './List_types';
import { theme as Themes } from '@common/styles';
export function List<T>({
  size,
  bordered,
  dataSource,
  footer,
  header,
  loading,
  renderItem,
}: IList<T>): JSX.Element {
  return (
    <ListStyled>
      {header && <HeaderStyled>{header}</HeaderStyled>}
      {dataSource &&
        dataSource.map((val: any, idx: number) => (
          <ListItemStyled key={idx}>{val.title}</ListItemStyled>
        ))}
      {footer && <FooterStyled>{footer}</FooterStyled>}
    </ListStyled>
  );
}

List.defaultProps = {
  size: LIST_SIZE.DEFALUT,
  bordered: true,
  loading: false,
};

const ListStyled = styled.ul`
  border: 1px solid ${Themes.colors.gray1};
  & li {
    border-bottom: 1px solid ${Themes.colors.gray1};
  }
  & li:last-of-type {
    border-bottom: none;
  }
`;

const ListItemStyled = styled.li`
  padding: 12px 24px;
`;

const HeaderStyled = styled.div`
  border-bottom: 1px solid ${Themes.colors.gray1};
  padding: 12px 24px;
`;

const FooterStyled = styled.div`
  border-top: 1px solid ${Themes.colors.gray1};
  padding: 12px 24px;
`;
