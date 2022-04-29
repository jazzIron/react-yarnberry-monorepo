import { Spinner } from '@components/spinner/Spinner';
import styled from '@emotion/styled';

export default function CustomLoadingOverlay() {
  return (
    <CustomLoadingOverlayStyled>
      <Spinner onActive={true} fullCover={false} />
    </CustomLoadingOverlayStyled>
  );
}

const CustomLoadingOverlayStyled = styled.div``;
