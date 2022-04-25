import { FORM_VALIDATE_TYPE, IFormData } from './Form_types';

export const formTestData: IFormData[] = [
  {
    id: 'name',
    option: {
      defaultValue: { name: '', position: 'nurse' },
      validate: [
        {
          type: FORM_VALIDATE_TYPE.REQUIRED,
          name: 'name',
          failMsg: '이름 필수',
        },
      ],
    },
  },
  {
    id: 'id',
    option: {
      defaultValue: '',
      validate: [
        {
          type: FORM_VALIDATE_TYPE.REQUIRED,
          name: 'id',
          failMsg: 'ID 필수',
        },
        {
          type: FORM_VALIDATE_TYPE.EMAIL,
          name: 'id',
          failMsg: '이메일 타입 오류',
        },
      ],
      sucMsg: '확인완료',
    },
  },
  {
    id: 'advice',
    option: [
      {
        name: 'url',
        defaultValue: '',
        validate: [
          {
            type: FORM_VALIDATE_TYPE.REQUIRED,
            name: 'url',
            failMsg: 'url 필수',
          },
        ],
      },
      {
        name: 'url2',
        defaultValue: '',
        validate: [],
      },
    ],
  },
];
