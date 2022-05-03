import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Icon, ICON_LIST } from '../icon';
import { theme as Themes, colors, cssx, fonts } from '@common/styles';
import { isEmpty } from 'lodash';
import ReactModal from 'react-modal';

import { ALERT_THEME, IAlert, IAlertThemeStyles } from './Alert_types';
import { Button, BUTTON_SIZE, BUTTON_THEME, IButton, IButtonStyled } from '../button';

function AlertContents({ str }: { str: string }) {
  if (str === '') return <br />;

  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: str }} />
    </>
  );
}

export function Alert(props: IAlert) {
  const { title, isOpen, theme, contents, elements, btnOk, btnClose, useReqClose } = props;

  const onOkHandler = () => {
    btnOk.onClick();
  };

  const onCloseHandler = () => {
    if (btnClose) btnClose.onClick(false);
  };

  const onRequestClose = () => {
    if (btnClose && useReqClose) btnClose.onClick(false);
  };

  const themeStyles = alertThemeStyles[theme];

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        ...customStyle,
        content: {
          ...customStyle.content,
          ...themeStyles.size,
        },
      }}
      appElement={document.getElementById('root') || undefined}
    >
      {!isEmpty(themeStyles.icon) && (
        <AlertIcon>
          <Icon icon={themeStyles.icon} width="64px" />
        </AlertIcon>
      )}
      <AlertMessage>
        {title && <strong> {title}</strong>}
        {contents && (
          <div>
            {contents.map((str, idx) => (
              <AlertContents key={idx} str={str} />
            ))}
          </div>
        )}
        {elements && <ElementContent>{elements}</ElementContent>}
      </AlertMessage>
      <ButtonWrap>
        <Button
          label={btnOk.label}
          onClick={onOkHandler}
          size={BUTTON_SIZE.LARGE}
          theme={BUTTON_THEME.PRIMARY}
        />
        {!!btnClose && (
          <Button
            label={btnClose.label}
            onClick={onCloseHandler}
            size={BUTTON_SIZE.LARGE}
            theme={themeStyles.closeTheme ? themeStyles.closeTheme : BUTTON_THEME.LINEBLACK}
          />
        )}
      </ButtonWrap>
    </ReactModal>
  );
}

Alert.defaultProps = {
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '420px',
    // minWidth: '420px',
    // maxWidth: '500px',
    height: 'fit-content',
    background: colors.gray_11,
    borderRadius: '8px',
    outline: 'none',
    margin: 'auto',
    padding: 30,
    border: 'none',
  },
};

const alertThemeStyles: IAlertThemeStyles = {
  [ALERT_THEME.NOTICE]: {
    icon: ICON_LIST.icn_pop_alert,
    size: { width: '500px' },
    closeTheme: BUTTON_THEME.LINERED,
  },
  [ALERT_THEME.CONFIRM]: {
    icon: ICON_LIST.icn_pop_confirm,
    size: {},
    closeTheme: BUTTON_THEME.LINEBLACK,
  },
  [ALERT_THEME.SUCCESS]: {
    icon: ICON_LIST.icn_pop_success,
    size: {},
  },
  [ALERT_THEME.WARNING]: {
    icon: ICON_LIST.icn_pop_warn,
    size: {},
  },
  [ALERT_THEME.FAIL]: {
    icon: ICON_LIST.icn_pop_warn,
    size: {},
  },
  [ALERT_THEME.ELEMENT]: {
    icon: '',
    size: {},
  },
};

const AlertIcon = styled.div`
  margin-bottom: 20px;
`;

const ButtonWrap = styled.div`
  margin-top: 30px;
  ${Themes.cssx.flexCenter};
  gap: 10px;
`;

const AlertMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  > strong {
    display: block;
    margin-bottom: 10px;
    ${({ theme }) =>
      css`
        ${Themes.fonts.h0};
        color: ${Themes.colors.gray_01};
      `}
  }
  p {
    text-align: center;
    ${({ theme }) =>
      css`
        ${Themes.fonts.body_01}
        color: ${Themes.colors.gray_02};
      `};
    em {
      ${Themes.fonts.body_01_b};
    }
    span {
      color: ${Themes.colors.ays_point_01};
    }
  }
`;

const ElementContent = styled.div``;
