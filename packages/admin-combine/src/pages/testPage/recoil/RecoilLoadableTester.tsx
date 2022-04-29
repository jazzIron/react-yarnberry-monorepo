import styled from '@emotion/styled';
import { api } from '@src/api/Instance';
import { mock } from '@src/api/Mock';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { atom, useRecoilValue, useRecoilValueLoadable } from 'recoil';

export const getTreatStateApi = async (doctorsId: number) => {
  const apiConfig: AxiosRequestConfig = {
    url: `test/${doctorsId}`,
    method: 'GET',
    params: { doctorsId: doctorsId },
  };
  const res = api(apiConfig);
  return res;
};

const tableState = atom({
  key: 'tableState',
  default: [],
  effects_UNSTABLE: [
    // ({ setSelf }) => {
    //   setSelf(testApi(1234));
    // },
  ],
});

export function RecoilLoadableTester() {
  const { state, contents } = useRecoilValueLoadable(tableState);

  console.log(state);
  console.log(contents);

  return <RecoilLoadableTesterStyled></RecoilLoadableTesterStyled>;
}

const RecoilLoadableTesterStyled = styled.div``;
