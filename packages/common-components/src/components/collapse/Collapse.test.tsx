import { Collapse } from './Collapse';
import { makeBulkContent } from './sample.data';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/*
:TODO
1.버튼 클릭시 컨텐트 박스 디스플레이 상태 변화
2.버튼 클릭시 스크롤 위치 변화
*/

describe('Collapse Component', () => {
  const contents = makeBulkContent(15);
  const collapseComponent = <Collapse contents={contents} />;
  beforeEach(() => {
    render(collapseComponent);
  });

  // it('초기화면에서 컨텐트박스 숨김', () => {
  //   const contentA = screen.getAllByText('content')[0];
  //   const isHidden = contentA.getAttribute('hidden');
  //   expect(isHidden).toBeTruthy();
  // });

  // it('버튼 클릭시 컨텐트 박스 디스플레이', () => {
  //   const button = screen.getAllByText('+')[0];
  //   userEvent.click(button);
  //   const contentA = screen.getAllByText('content')[0];

  //   const isHidden = contentA.getAttributeNames();
  //   console.log(isHidden);
  //   expect(isHidden).toBeFalsy();
  // });
});
