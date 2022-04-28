import styled from '@emotion/styled';
import { theme as Themes, colors, cssx, fonts } from '@common/styles';
import { IBreadcrumb } from './Breadcrumb_types';

const data = ['회원관리', '회원리스트'];

//headerList 느낌

// 모양 옵셔널

export function Breadcrumb(props: IBreadcrumb) {
  const separator = '>';
  const handleClick = () => {
    return true;
  };
  return (
    <BreadcrumbStyled>
      {data &&
        data.map((item, idx) => (
          <>
            <BreadcrumbItem key={idx} onClick={handleClick}>
              {item}
            </BreadcrumbItem>
            {data.length - 1 !== idx && <BreadcrumbSeparator> {separator} </BreadcrumbSeparator>}
          </>
        ))}
    </BreadcrumbStyled>
  );
}

const BreadcrumbStyled = styled.div`
  color: ${colors.gray_05};
  ${fonts.body_02}
  span:nth-child(3) {
    color: ${colors.gray_01};
  }
`;
const BreadcrumbItem = styled.span``;
const BreadcrumbSeparator = styled.span``;
