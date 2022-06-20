const apiRootAdmin = process.env.ADMIN_URL;

const MEMBER_ROOT = `${apiRootAdmin}/api/v3/memberAdmin/admin`;

const MEMBER_ADMIN = {
  MEMBER: {
    CHANGE_INIT_PASSWORD: `${MEMBER_ROOT}/members/initChangePassword`,
    CHANGE_PASSWORD: `${MEMBER_ROOT}/members/changePassword`,
    INIT_PASSWORD: (id: number) => `${MEMBER_ROOT}/members/initPassword/${id}`,
    MEMBER_MASTER_LIST: `${MEMBER_ROOT}/members/search`,
    MEMBER_MASTER_DETAIL: (id: number) => `${MEMBER_ROOT}/members/${id}`,
    MEMBER_MASTER_UPDATE: `${MEMBER_ROOT}/members`,
  },
  ACCOUNT: {
    SIGNIN: `${MEMBER_ROOT}/accounts/signIn`,
    REFRESH_TOKEN: `${MEMBER_ROOT}/accounts/tokenRefresh`,
    REGISTER: `${MEMBER_ROOT}/accounts/register`,
    EMAIL_DUPLICATE: `${MEMBER_ROOT}/accounts/checkEmailDuplicate`,
  },
};

export { MEMBER_ADMIN };
