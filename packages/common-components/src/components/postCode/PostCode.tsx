import { isEmpty, isNull } from 'lodash';
import { useEffect, useState } from 'react';

import { Button } from '../button';
// import { useModal } from '../modal/useModal';

import { IApiAddress, IPostCode, IPostSearchData } from './PostCode_types';
import { PostCodeDetail } from './PostCodeDetail';
import { PostCodeSearch } from './PostCodeSearch';

// TODO: Modal 처리 필요
export function PostCode({ visible, onComplete }: IPostCode) {
  //const { openModal, modContents, closeModal } = useModal();

  const [localAddr, setLocalAddr] = useState<IPostSearchData | null>(null);
  const [detail, setDetail] = useState('');

  const setCodeFormat = (data: IApiAddress) => {
    const { bname, roadAddress, jibunAddress, buildingName, userSelectedType, zonecode } = data;
    const extarAddr = `(${[bname, buildingName].filter(Boolean).join(', ')})`;
    const addressInfo = (userSelectedType === 'J' ? jibunAddress : roadAddress) + ' ' + extarAddr;

    setLocalAddr({ ...data, localAddress: addressInfo });
  };

  const onChangeDetail = (val: string) => {
    setDetail(val);
  };

  const onCompleteHandler = () => {
    if (!isNull(localAddr)) {
      onComplete({
        zonecode: localAddr.zonecode,
        localAddress: localAddr.localAddress,
        detailAddress: detail,
      });
    }

    //closeModal();
  };

  // useEffect(() => {
  //   if (visible) {
  //     openModal({
  //       contents: (
  //         <div style={{ width: '100%', height: '100%' }}>
  //           <PostCodeSearch onSearch={setCodeFormat} />
  //         </div>
  //       ),
  //       sizeCustom: {
  //         width: '500px',
  //         height: '600px',
  //       },
  //     });
  //   } else {
  //     closeModal();
  //   }
  // }, [visible]);

  // useEffect(() => {
  //   if (visible && !isNull(localAddr)) {
  //     modContents(
  //       <>
  //         <PostCodeDetail
  //           value={detail}
  //           codes={{ zonecode: localAddr.zonecode, localAddress: localAddr.localAddress }}
  //           onChange={onChangeDetail}
  //           onComplete={onCompleteHandler}
  //         />
  //         <Button label="확인" onClick={onCompleteHandler} />
  //       </>,
  //     );
  //   }
  // }, [visible, localAddr]);

  return null;
}
