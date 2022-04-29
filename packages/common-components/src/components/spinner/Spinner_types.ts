export enum SPINNER_TYPE {
  'AUDIO' = 'Audio',
  'BALLTRIANGLE' = 'BallTriangle',
  'BARS' = 'Bars',
  'CIRCLES' = 'Circles',
  'GRID' = 'Grid',
  'HEARTS' = 'Hearts',
  'OVAL' = 'Oval',
  'PUFF' = 'Puff',
  'RINGS' = 'Rings',
  'TAILSPIN' = 'TailSpin',
  'THREEDOTS' = 'ThreeDots',
  'WATCH' = 'Watch',
  'REVOLVINGDOT' = 'RevolvingDot',
  'TRIANGLE' = 'Triangle',
  'Plane' = 'Plane',
  'MUTATINGDOTS' = 'MutatingDots',
  'CRADLELOADER' = 'CradleLoader',
}

export enum SPINNER_SIZE {
  LARGE = 'LARGE',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
}

export enum SPINNER_THEME {
  DEFAULT = 'DEFAULT',
  MASK = 'MASK',
}

export interface ISpinner {
  type:
    | 'Audio'
    | 'BallTriangle'
    | 'Bars'
    | 'Circles'
    | 'Grid'
    | 'Hearts'
    | 'Oval'
    | 'Puff'
    | 'Rings'
    | 'TailSpin'
    | 'ThreeDots'
    | 'Watch'
    | 'RevolvingDot'
    | 'Triangle'
    | 'Plane'
    | 'MutatingDots'
    | 'CradleLoader'; //스피너 타입
  theme: SPINNER_THEME;
  size: SPINNER_SIZE;
  content: string;
  onActive: boolean;
  fullCover: boolean; //true : 전체화면, false :일부
  height: string;
}
