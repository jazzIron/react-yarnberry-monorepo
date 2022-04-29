import { ReactNode } from 'react';
//import { ToastOptions } from 'react-toastify/dist/types/index';
//TEST

export enum TOAST_TYPE {
  'INFO' = 'info',
  'SUCCESS' = 'success',
  'WARNING' = 'warning',
  'ERROR' = 'error',
  'DEFAULT' = 'default',
}

export enum TOAST_OPTION_POSITION {
  'TOP_RIGHT' = 'top-right',
  'TOP_CENTER' = 'top-center',
  'TOP_LEFT' = 'top-left',
  'BOTTOM_RIGHT' = 'bottom-right',
  'BOTTOM_CETNER' = 'bottom-center',
  'BOTTOM_LEFT' = 'bottom-left',
}

export interface IToast {
  content: ReactNode | string;
  type: TOAST_TYPE;
  //options: ToastOptions;
  options: IToastOption;
}

export interface IToastOption {
  /**
   * 알림 위치
   */
  position: TOAST_OPTION_POSITION;
  /**
   * 알림이 나타날 때 호출
   */
  onOpen?: () => void;
  /**
   * 알림이 사라질 때 호출
   */
  onClose?: () => void;
  /**
   * 알림을 닫기 위한 지연 시간(ms) false로 설정하면 알림을 수동닫아야함
   */
  autoClose?: boolean | number;
  /**
   * 기본 닫기 버튼 또는 숨김여부
   */
  closeButton?: ReactNode | boolean;
  /**
   * A reference to a valid react-transition-group/Transition component
   */
  transition?: ReactNode;
  /**
   * 토스트 아래 진행바 표시 여부(남은 시간)
   */
  hideProgressBar?: boolean;
  /**
   * 타이머를 계속 실행하거나 마우스로 가리 키지 마십시오.
   */
  pauseOnHover?: boolean;
  /**
   * 창이 초점을 잃으면 타이머 일시 중지
   */
  pauseOnFocusLoss?: boolean;
  /**
   * 클릭 시 토스트 닫기
   */
  closeOnClick?: boolean;
  /**
   * 컨테이너에 선택적 클래스 추가
   */
  className?: string;
  /**
   * TransitionGroup 컨테이너에 선택적 클래스 추가
   */
  bodyClassName?: string;
  /**
   * 컨테이너에 선택적 인라인 스타일 추가
   */
  style?: React.CSSProperties;

  /**
   * 진행률 표시줄에 선택적 클래스 추가
   */
  progressClassName?: string;

  /**
   * 진행률 표시줄에 선택적 인라인 스타일 추가
   */
  progressStyle?: React.CSSProperties;

  /**
   * 알림을 드래그할 수 있도록 허용
   */
  draggable?: boolean;
  /**
   * 드래그하여 알림을 해제하는 데 필요한 알림 너비의 백분율(0에서 100 사이의 값)
   */
  draggablePercent?: number;
  /**
   * 드래그 가능한 방향
   */
  draggableDirection?: 'x' | 'y';

  /**
   * 알림 컨테이너 아이디
   */
  containerId?: string | number;

  /**
   * 알림 ARIA role
   */
  role?: string;
  /**
   * 알림 딜레이 설정
   */
  delay?: number;
  /**
   * 토스트 알림 내부를 클릭하면 호출
   */
  onClick?: () => void;
  /**
   * toast.update를 사용할 때만 사용 가능
   */
  render?: () => ReactNode;
}
