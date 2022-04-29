import styled from '@emotion/styled';
import { Icon, ICON_LIST } from '../icon';
import { theme as Themes } from '@common/styles';

export default function CustomNoRowsOverlay() {
  return (
    <CustomNoRowsOverlayWrapper>
      <IconWrapper>
        <Icon icon={ICON_LIST.icn_nodata} width="80px" />
      </IconWrapper>
      <TitleWrapper>등록된 데이터가 없습니다.</TitleWrapper>
    </CustomNoRowsOverlayWrapper>
  );
}

const CustomNoRowsOverlayWrapper = styled.div``;

const IconWrapper = styled.div``;
const TitleWrapper = styled.div`
  ${Themes.fonts.body_01}
  color: ${Themes.colors.gray_05};
  margin-top: 20px;
`;
