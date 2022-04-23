import styled from '@emotion/styled';
import { IIcon } from './Icon_types';

export function Icon({ icon, width }: IIcon) {
  return <img src={icon} alt="" width={width} height={width} />;
}

Icon.defaultProps = {
  width: '40px',
};

const IconStyled = styled.div``;
