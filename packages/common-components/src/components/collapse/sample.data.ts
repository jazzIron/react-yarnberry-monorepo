export const makeBulkContent = (mount: number) => {
  const array = [];

  for (let i = 1; i <= mount; i++) {
    array.push({
      id: i.toString(),
      title: `Q.  이용내역은 어디서 확인하나요? ${i}`,
      content: `어쩌구저쩌구 어쩌구에서 어쩌구 확인하시면 어쩌구 하실 수 있습니다.어쩌구저쩌구 어쩌구에서 어쩌구 확인하시면 어쩌구 하실 수 있습니다. She was more like a beauty queen from a movie scene I said don't mind, but what do you mean, I am the one Who will dance on the floor in the round? `,
    });
  }
  return array;
};
