import styled from '@emotion/styled';
import { Icon, ICON_LIST } from '../icon';
import { theme as Themes, colors, cssx, fonts } from '@common/styles';
import ReactModal from 'react-modal';

import { IModal, MODAL_SIZE } from './Modal_types';

export function Modal(props: IModal) {
  const { isOpen, title, contents, useReqClose, size, sizeCustom, onClose } = props;

  const setModalClose = () => {
    if (useReqClose) onClose(false);
  };

  const modalSize = sizeCustom
    ? {
        width: sizeCustom.width,
        height: sizeCustom.height,
      }
    : modalSizeStyles[size];

  const customStyles = {
    ...customStyle,
    content: { ...customStyle.content, ...modalSize },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={setModalClose}
      style={customStyles}
      appElement={document.getElementById('root') || undefined}
    >
      <ModalHeadStyled>
        {title && <span>{title}</span>}
        <button onClick={setModalClose}>
          <Icon icon={ICON_LIST['icn_close']} width={'24px'} />
        </button>
      </ModalHeadStyled>
      <PopModalStyled>
        <ContentsWrapper>{contents}</ContentsWrapper>
      </PopModalStyled>
    </ReactModal>
  );
}

Modal.defaultProps = {
  useReqClose: false,
};

const customStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 100,
  },
  content: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    background: colors.bg_gray,
    borderRadius: '10px',
    outline: 'none',
    margin: 'auto',
    padding: 0,
    border: 'none',
  },
};

const modalSizeStyles = {
  [MODAL_SIZE.XS]: { width: '350px', height: '250px' },
  [MODAL_SIZE.SMALL]: { width: '50%', height: '50%' },
  [MODAL_SIZE.REGULAR]: { width: '900px', height: 'fit-content' },
  [MODAL_SIZE.LARGE]: { width: '1280px', height: '852px' },
};

const ModalHeadStyled = styled.div`
  ${Themes.cssx.flexBtw}
  height: 60px;
  flex-grow: 0;
  padding: 16px 30px;
  ${Themes.fonts.h1_b}
  background-color: ${Themes.colors.gray_11};
  border-bottom: 1px solid ${Themes.colors.gray_07};
  > span {
    ${Themes.fonts.h1_b}
  }
  > div {
    width: 24px;
    height: 24px;
  }
`;

const PopModalStyled = styled.div`
  display: flex;
  flex: 1;
  background-color: ${Themes.colors.bg_gray};
  overflow: hidden;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 30px 30px;
  overflow-y: auto;
`;
