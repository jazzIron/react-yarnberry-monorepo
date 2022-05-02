import { FORM_VALIDATE_TYPE, IFormData } from '@common/components';

export const loginOption: IFormData[] = [
  {
    id: 'email',
    option: {
      defaultValue: '',
      validate: [
        {
          type: FORM_VALIDATE_TYPE.REQUIRED,
          name: 'email',
          failMsg: '아이디(E-mail)를 입력해주세요.',
        },
        {
          type: FORM_VALIDATE_TYPE.EMAIL,
          name: 'email',
          failMsg: '올바른 이메일 형식이 아닙니다.',
        },
      ],
    },
  },
  {
    id: 'password',
    option: {
      defaultValue: '',
      validate: [
        {
          type: FORM_VALIDATE_TYPE.REQUIRED,
          name: 'pw',
          failMsg: '비밀번호를 입력해주세요.',
        },
      ],
    },
  },
];
