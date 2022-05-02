import styled from '@emotion/styled';
import { IIcon } from './Icon_types';

export function Icon({ icon, width }: IIcon) {
  return <img src={icon} alt="" width={width} height={width} />;
  // return <IconStyled width={width}>{icon}</IconStyled>;
}

Icon.defaultProps = {
  width: '40px',
};

const IconStyled = styled.div<{ width: string }>`
  width: ${(props) => props.width};
`;
