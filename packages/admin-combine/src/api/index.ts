export * from './Instance';
export * from './interceptor';

// TODO: 협의 진행 예정
export default {
  MEMBER_APP: {
    _: '/api/hospital',
    CHECKE_MAIL_DUPLICATE: (email: string) =>
      `/api/hospital/accounts/checkEmailDuplicate?email=${email}`,
    SIGN_IN: `/api/hospital/accounts/signIn`,
    CHANGE_PASSWORD: `/api/hospital/members/changePassword`,
    CHANGE_TEMP_PASSWORD: `/api/hospital/members/initChangePassword`,
    INIT_PASSWORD: (userId: number) => `/api/hospital/managers/initPassword/${userId}`,
  },
  MEMBER_HOSPITAL: { _: '/api/v3/memberHospital' },
  MEDICAL_RECORD: { _: '/api/v3/medicalRecord' },
};
