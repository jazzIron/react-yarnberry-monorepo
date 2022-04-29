import { Button } from '../button/Button';
import { Space } from '../space/Space';
import styled from '@emotion/styled';
import { ToastHook } from './ToastHook';
import { TOAST_TYPE, TOAST_OPTION_POSITION } from './Toast_types';
import { SPACE_DIRECTION } from '../space/Space_types';

export function Toast(props: any) {
  const { toastId, toastDismiss, toastMake, toastActiveCheck, toastUpdate } = ToastHook();
  const handleOpen = () => {
    console.log('handleOpen');
  };

  const handleClose = () => {
    console.log('handleClose');
  };

  const handleClick = () => {
    console.log('handleClick');
  };

  //toast 실행
  const handleToastMsgMake = (type: TOAST_TYPE) => {
    toastMake({
      content: 'test',
      type: type,
      options: {
        autoClose: false,
        onOpen: handleOpen,
        onClose: handleClose,
        onClick: handleClick,
        position: TOAST_OPTION_POSITION.TOP_CENTER,
      },
    });
  };

  //toast가 열려있는지 체크
  const handleToastActiveCheck = () => {
    console.log(toastId && toastActiveCheck(toastId));
  };

  //toast message 변경
  const handleToastMsgUpdate = () => {
    const options = {
      type: TOAST_TYPE.INFO,
      isLoading: true,
      onOpen: handleOpen,
      onClose: handleClose,
      render: <div>updateToastItem</div>,
    };
    return toastId && toastUpdate(toastId, options);
  };

  //열려있는 toast 닫기
  const handleToastMsgDismiss = () => {
    return toastDismiss();
  };

  return (
    <ToastStyled>
      <Space gap={30} direction={SPACE_DIRECTION.VERTICAL}>
        <Button
          label={'DEFAULT TOAST MSG'}
          onClick={() => handleToastMsgMake(TOAST_TYPE.DEFAULT)}
        />
        <Button label={'INFO TOAST MSG'} onClick={() => handleToastMsgMake(TOAST_TYPE.INFO)} />
        <Button
          label={'SUCCESS TOAST MSG'}
          onClick={() => handleToastMsgMake(TOAST_TYPE.SUCCESS)}
        />
        <Button
          label={'WARNING TOAST MSG'}
          onClick={() => handleToastMsgMake(TOAST_TYPE.WARNING)}
        />
        <Button label={'CHECK TOAST'} onClick={handleToastActiveCheck} />
        <Button label={'UPDATE TOAST MSG'} onClick={handleToastMsgUpdate} />
        <Button label={'DISMISS TOAST MSG'} onClick={handleToastMsgDismiss} />
      </Space>
    </ToastStyled>
  );
}

const ToastStyled = styled.div``;
