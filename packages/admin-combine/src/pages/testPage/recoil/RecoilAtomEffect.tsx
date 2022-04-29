import { api } from '@src/api/Instance';
import { AxiosRequestConfig } from 'axios';
import {
  atom,
  useRecoilState,
  atomFamily,
  useRecoilCallback,
  useRecoilStateLoadable,
} from 'recoil';

//https://jsonplaceholder.typicode.com/

const getPostItem = async (postId: number | null) => {
  const postIdParam = postId ? postId : '';
  const apiConfig: AxiosRequestConfig = {
    url: `https://jsonplaceholder.typicode.com/comments/${postIdParam}`,
    method: 'GET',
    // params: { doctorsId: doctorsId },
  };
  const res = api(apiConfig);
  return res;
};

const postIdState = atom<number | null>({
  key: 'postIdState',
  default: null,
  effects_UNSTABLE: [],
});

interface ItemType {
  postId: number | null;
  id: number;
  name: string;
  email: string;
  body: string;
}

const initItemState = [
  {
    postId: 0,
    id: 0,
    name: '',
    email: '',
    body: '',
  },
];

const flagState = atom<number>({
  key: 'flagState',
  default: 0,
});

const postItem = atomFamily<ItemType[], number | null>({
  key: 'item',
  default: initItemState,
  effects_UNSTABLE: (postId) => [
    ({ node, onSet, setSelf, trigger, resetSelf }) => {
      console.log(getPostItem(postId));
      console.log(node);
      setSelf(getPostItem(postId));
    },
  ],
});

export function RecoilAtomEffect() {
  const [hasFlag, setHasFlag] = useRecoilState(flagState);
  const [postId, setPostId] = useRecoilState<number | null>(postIdState);
  const [comments, setComments] = useRecoilStateLoadable(postItem(postId));
  const { state, contents } = comments;

  const handleClick = useRecoilCallback(({ set }) => () => {
    //setPostId((prev) => (prev ? prev + 1 : 1));
    setHasFlag((prev) => prev + 1);
    setPostId(1);
  });

  const handleClick2 = useRecoilCallback(({ set }) => () => {
    setPostId((prev) => (prev ? prev + 1 : 1));
  });

  if (state === 'loading') return <>loading....</>;

  return (
    <>
      테스트
      <div>
        <button onClick={handleClick}>다음 아이템 가저오기</button>
      </div>
      <div>
        <button onClick={handleClick2}>다음 아이템 가저오기</button>
      </div>
      <ul>
        {contents.map((v: ItemType) => (
          <ItemContent key={v.id} item={v} />
        ))}
      </ul>
    </>
  );
}

interface propsType {
  key: number;
  item: ItemType;
}
const ItemContent = ({ key, item }: propsType) => {
  return (
    <>
      <li>
        <div>{item.postId}</div>
        <div>{item.id}</div>
        <div>{item.name}</div>
        <div>{item.email}</div>
        <div>{item.body}</div>
      </li>
    </>
  );
};
