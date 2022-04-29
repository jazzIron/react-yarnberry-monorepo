export const mock = {
  login: {
    url: '/login',
    params: { id: '', password: '' },
    results: {
      users: [{ id: 'beplus', name: 'john fail' }],
    },
  },
};

export const mockFail = {
  email: {
    url: '/email',
    params: { email: 'yes@naver.com' },
    results: {
      status: '200',
      payload: [{ authResult: true }],
    },
  },
};
