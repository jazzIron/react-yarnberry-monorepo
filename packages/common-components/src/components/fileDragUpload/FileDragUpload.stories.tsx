import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import { FileDragUpload } from './FileDragUpload';
import { IFileTypes } from './FileDragUpload_types';

export default {
  title: `Components/FileDragTest`,
  component: FileDragUpload,
} as ComponentMeta<typeof FileDragUpload>;

const Template: ComponentStory<typeof FileDragUpload> = (args) => {
  const [clear, setClear] = useState(false);
  const onChange = (files: IFileTypes[]) => {
    console.log(files);
  };
  return (
    <div>
      <button onClick={() => setClear(true)}>file clear</button>
      <FileDragUpload {...args} onChange={onChange} isClear={clear} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'uploader',
  disabled: false,
  maxLength: 10,
};

export const SetDefaultFile = Template.bind({});
SetDefaultFile.args = {
  id: 'uploader',
  defaultFile: [
    {
      id: 'file1',
      fileName: 'sample file',
      fileUrl:
        'https://www.google.com/search?q=dog&sxsrf=APq-WBubv-8wmAQ2VpGnsBV-ImDY0ZoSFg:1646271763263&tbm=isch&source=iu&ictx=1&vet=1&fir=wzRcY9R2ANhK-M%252C2r6Arj4-hBjhNM%252C_%253B48lHkI24a1lDuM%252CEGY4Ty2FXT1ZkM%252C_%253BXOie6kN60_1ThM%252CyMvHGACpKSsnUM%252C_%253BAdZDAIcrJx_j4M%252CPUlX44c-WOm0fM%252C_%253B0q-6o5yeHKTpNM%252CFofFudZ0yWjNIM%252C_%253BM1gdx1TqeiwBWM%252CrCTsFF5GgDKfRM%252C_%253Bsbbc4P-cFNmHEM%252CWdQJYRL3o17gHM%252C_%253BOhtMhQNVZpcSXM%252CSytthMZdPj3fzM%252C_%253BSMMlmWDadP14fM%252C_RVRngRfeprTTM%252C_%253BUfAylDiBEvZIEM%252Cwcri1DRA-RrvRM%252C_%253By7-l1LKrhJJZUM%252CfyMNFpQ0-F0fXM%252C_%253BxnLK1gX2C7MD4M%252C7_0Bfy_K4HkgMM%252C_%253BGoLDdaHMkxnqIM%252C-x47coUNHb1Z3M%252C_%253BisYxn0zcjEZ6wM%252CssXO_nqQcBJ3uM%252C_&usg=AI4_-kTi2dN0XGvJgFa0OxNfqpV9TmOYlA&sa=X&ved=2ahUKEwipqpyd6Kj2AhVOeN4KHaSdBCsQ9QF6BAgEEAE&biw=1536&bih=714&dpr=1.25#imgrc=wzRcY9R2ANhK-M',
    },
    {
      id: 'file2',
      fileName: 'sample file2',
      fileUrl:
        'https://www.google.com/search?q=dog&sxsrf=APq-WBubv-8wmAQ2VpGnsBV-ImDY0ZoSFg:1646271763263&tbm=isch&source=iu&ictx=1&vet=1&fir=wzRcY9R2ANhK-M%252C2r6Arj4-hBjhNM%252C_%253B48lHkI24a1lDuM%252CEGY4Ty2FXT1ZkM%252C_%253BXOie6kN60_1ThM%252CyMvHGACpKSsnUM%252C_%253BAdZDAIcrJx_j4M%252CPUlX44c-WOm0fM%252C_%253B0q-6o5yeHKTpNM%252CFofFudZ0yWjNIM%252C_%253BM1gdx1TqeiwBWM%252CrCTsFF5GgDKfRM%252C_%253Bsbbc4P-cFNmHEM%252CWdQJYRL3o17gHM%252C_%253BOhtMhQNVZpcSXM%252CSytthMZdPj3fzM%252C_%253BSMMlmWDadP14fM%252C_RVRngRfeprTTM%252C_%253BUfAylDiBEvZIEM%252Cwcri1DRA-RrvRM%252C_%253By7-l1LKrhJJZUM%252CfyMNFpQ0-F0fXM%252C_%253BxnLK1gX2C7MD4M%252C7_0Bfy_K4HkgMM%252C_%253BGoLDdaHMkxnqIM%252C-x47coUNHb1Z3M%252C_%253BisYxn0zcjEZ6wM%252CssXO_nqQcBJ3uM%252C_&usg=AI4_-kTi2dN0XGvJgFa0OxNfqpV9TmOYlA&sa=X&ved=2ahUKEwipqpyd6Kj2AhVOeN4KHaSdBCsQ9QF6BAgEEAE&biw=1536&bih=714&dpr=1.25#imgrc=wzRcY9R2ANhK-M',
    },
    {
      id: 'file3',
      fileName: 'sample file3',
      fileUrl:
        'https://www.google.com/search?q=dog&sxsrf=APq-WBubv-8wmAQ2VpGnsBV-ImDY0ZoSFg:1646271763263&tbm=isch&source=iu&ictx=1&vet=1&fir=wzRcY9R2ANhK-M%252C2r6Arj4-hBjhNM%252C_%253B48lHkI24a1lDuM%252CEGY4Ty2FXT1ZkM%252C_%253BXOie6kN60_1ThM%252CyMvHGACpKSsnUM%252C_%253BAdZDAIcrJx_j4M%252CPUlX44c-WOm0fM%252C_%253B0q-6o5yeHKTpNM%252CFofFudZ0yWjNIM%252C_%253BM1gdx1TqeiwBWM%252CrCTsFF5GgDKfRM%252C_%253Bsbbc4P-cFNmHEM%252CWdQJYRL3o17gHM%252C_%253BOhtMhQNVZpcSXM%252CSytthMZdPj3fzM%252C_%253BSMMlmWDadP14fM%252C_RVRngRfeprTTM%252C_%253BUfAylDiBEvZIEM%252Cwcri1DRA-RrvRM%252C_%253By7-l1LKrhJJZUM%252CfyMNFpQ0-F0fXM%252C_%253BxnLK1gX2C7MD4M%252C7_0Bfy_K4HkgMM%252C_%253BGoLDdaHMkxnqIM%252C-x47coUNHb1Z3M%252C_%253BisYxn0zcjEZ6wM%252CssXO_nqQcBJ3uM%252C_&usg=AI4_-kTi2dN0XGvJgFa0OxNfqpV9TmOYlA&sa=X&ved=2ahUKEwipqpyd6Kj2AhVOeN4KHaSdBCsQ9QF6BAgEEAE&biw=1536&bih=714&dpr=1.25#imgrc=wzRcY9R2ANhK-M',
    },
    {
      id: 'file4',
      fileName: 'sample file4',
      fileUrl:
        'https://www.google.com/search?q=dog&sxsrf=APq-WBubv-8wmAQ2VpGnsBV-ImDY0ZoSFg:1646271763263&tbm=isch&source=iu&ictx=1&vet=1&fir=wzRcY9R2ANhK-M%252C2r6Arj4-hBjhNM%252C_%253B48lHkI24a1lDuM%252CEGY4Ty2FXT1ZkM%252C_%253BXOie6kN60_1ThM%252CyMvHGACpKSsnUM%252C_%253BAdZDAIcrJx_j4M%252CPUlX44c-WOm0fM%252C_%253B0q-6o5yeHKTpNM%252CFofFudZ0yWjNIM%252C_%253BM1gdx1TqeiwBWM%252CrCTsFF5GgDKfRM%252C_%253Bsbbc4P-cFNmHEM%252CWdQJYRL3o17gHM%252C_%253BOhtMhQNVZpcSXM%252CSytthMZdPj3fzM%252C_%253BSMMlmWDadP14fM%252C_RVRngRfeprTTM%252C_%253BUfAylDiBEvZIEM%252Cwcri1DRA-RrvRM%252C_%253By7-l1LKrhJJZUM%252CfyMNFpQ0-F0fXM%252C_%253BxnLK1gX2C7MD4M%252C7_0Bfy_K4HkgMM%252C_%253BGoLDdaHMkxnqIM%252C-x47coUNHb1Z3M%252C_%253BisYxn0zcjEZ6wM%252CssXO_nqQcBJ3uM%252C_&usg=AI4_-kTi2dN0XGvJgFa0OxNfqpV9TmOYlA&sa=X&ved=2ahUKEwipqpyd6Kj2AhVOeN4KHaSdBCsQ9QF6BAgEEAE&biw=1536&bih=714&dpr=1.25#imgrc=wzRcY9R2ANhK-M',
    },
    {
      id: 'file5',
      fileName: 'sample file5',
      fileUrl:
        'https://www.google.com/search?q=dog&sxsrf=APq-WBubv-8wmAQ2VpGnsBV-ImDY0ZoSFg:1646271763263&tbm=isch&source=iu&ictx=1&vet=1&fir=wzRcY9R2ANhK-M%252C2r6Arj4-hBjhNM%252C_%253B48lHkI24a1lDuM%252CEGY4Ty2FXT1ZkM%252C_%253BXOie6kN60_1ThM%252CyMvHGACpKSsnUM%252C_%253BAdZDAIcrJx_j4M%252CPUlX44c-WOm0fM%252C_%253B0q-6o5yeHKTpNM%252CFofFudZ0yWjNIM%252C_%253BM1gdx1TqeiwBWM%252CrCTsFF5GgDKfRM%252C_%253Bsbbc4P-cFNmHEM%252CWdQJYRL3o17gHM%252C_%253BOhtMhQNVZpcSXM%252CSytthMZdPj3fzM%252C_%253BSMMlmWDadP14fM%252C_RVRngRfeprTTM%252C_%253BUfAylDiBEvZIEM%252Cwcri1DRA-RrvRM%252C_%253By7-l1LKrhJJZUM%252CfyMNFpQ0-F0fXM%252C_%253BxnLK1gX2C7MD4M%252C7_0Bfy_K4HkgMM%252C_%253BGoLDdaHMkxnqIM%252C-x47coUNHb1Z3M%252C_%253BisYxn0zcjEZ6wM%252CssXO_nqQcBJ3uM%252C_&usg=AI4_-kTi2dN0XGvJgFa0OxNfqpV9TmOYlA&sa=X&ved=2ahUKEwipqpyd6Kj2AhVOeN4KHaSdBCsQ9QF6BAgEEAE&biw=1536&bih=714&dpr=1.25#imgrc=wzRcY9R2ANhK-M',
    },
    {
      id: 'file6',
      fileName: 'sample file6',
      fileUrl:
        'https://www.google.com/search?q=dog&sxsrf=APq-WBubv-8wmAQ2VpGnsBV-ImDY0ZoSFg:1646271763263&tbm=isch&source=iu&ictx=1&vet=1&fir=wzRcY9R2ANhK-M%252C2r6Arj4-hBjhNM%252C_%253B48lHkI24a1lDuM%252CEGY4Ty2FXT1ZkM%252C_%253BXOie6kN60_1ThM%252CyMvHGACpKSsnUM%252C_%253BAdZDAIcrJx_j4M%252CPUlX44c-WOm0fM%252C_%253B0q-6o5yeHKTpNM%252CFofFudZ0yWjNIM%252C_%253BM1gdx1TqeiwBWM%252CrCTsFF5GgDKfRM%252C_%253Bsbbc4P-cFNmHEM%252CWdQJYRL3o17gHM%252C_%253BOhtMhQNVZpcSXM%252CSytthMZdPj3fzM%252C_%253BSMMlmWDadP14fM%252C_RVRngRfeprTTM%252C_%253BUfAylDiBEvZIEM%252Cwcri1DRA-RrvRM%252C_%253By7-l1LKrhJJZUM%252CfyMNFpQ0-F0fXM%252C_%253BxnLK1gX2C7MD4M%252C7_0Bfy_K4HkgMM%252C_%253BGoLDdaHMkxnqIM%252C-x47coUNHb1Z3M%252C_%253BisYxn0zcjEZ6wM%252CssXO_nqQcBJ3uM%252C_&usg=AI4_-kTi2dN0XGvJgFa0OxNfqpV9TmOYlA&sa=X&ved=2ahUKEwipqpyd6Kj2AhVOeN4KHaSdBCsQ9QF6BAgEEAE&biw=1536&bih=714&dpr=1.25#imgrc=wzRcY9R2ANhK-M',
    },
    {
      id: 'file7',
      fileName: 'sample file7',
      fileUrl:
        'https://www.google.com/search?q=dog&sxsrf=APq-WBubv-8wmAQ2VpGnsBV-ImDY0ZoSFg:1646271763263&tbm=isch&source=iu&ictx=1&vet=1&fir=wzRcY9R2ANhK-M%252C2r6Arj4-hBjhNM%252C_%253B48lHkI24a1lDuM%252CEGY4Ty2FXT1ZkM%252C_%253BXOie6kN60_1ThM%252CyMvHGACpKSsnUM%252C_%253BAdZDAIcrJx_j4M%252CPUlX44c-WOm0fM%252C_%253B0q-6o5yeHKTpNM%252CFofFudZ0yWjNIM%252C_%253BM1gdx1TqeiwBWM%252CrCTsFF5GgDKfRM%252C_%253Bsbbc4P-cFNmHEM%252CWdQJYRL3o17gHM%252C_%253BOhtMhQNVZpcSXM%252CSytthMZdPj3fzM%252C_%253BSMMlmWDadP14fM%252C_RVRngRfeprTTM%252C_%253BUfAylDiBEvZIEM%252Cwcri1DRA-RrvRM%252C_%253By7-l1LKrhJJZUM%252CfyMNFpQ0-F0fXM%252C_%253BxnLK1gX2C7MD4M%252C7_0Bfy_K4HkgMM%252C_%253BGoLDdaHMkxnqIM%252C-x47coUNHb1Z3M%252C_%253BisYxn0zcjEZ6wM%252CssXO_nqQcBJ3uM%252C_&usg=AI4_-kTi2dN0XGvJgFa0OxNfqpV9TmOYlA&sa=X&ved=2ahUKEwipqpyd6Kj2AhVOeN4KHaSdBCsQ9QF6BAgEEAE&biw=1536&bih=714&dpr=1.25#imgrc=wzRcY9R2ANhK-M',
    },
  ],
};

export const Test = () => {
  const [files, setFiles] = useState([
    {
      id: 'file1',
      fileName: 'sample file',
      fileUrl:
        'https://www.google.com/search?q=dog&sxsrf=APq-WBubv-8wmAQ2VpGnsBV-ImDY0ZoSFg:1646271763263&tbm=isch&source=iu&ictx=1&vet=1&fir=wzRcY9R2ANhK-M%252C2r6Arj4-hBjhNM%252C_%253B48lHkI24a1lDuM%252CEGY4Ty2FXT1ZkM%252C_%253BXOie6kN60_1ThM%252CyMvHGACpKSsnUM%252C_%253BAdZDAIcrJx_j4M%252CPUlX44c-WOm0fM%252C_%253B0q-6o5yeHKTpNM%252CFofFudZ0yWjNIM%252C_%253BM1gdx1TqeiwBWM%252CrCTsFF5GgDKfRM%252C_%253Bsbbc4P-cFNmHEM%252CWdQJYRL3o17gHM%252C_%253BOhtMhQNVZpcSXM%252CSytthMZdPj3fzM%252C_%253BSMMlmWDadP14fM%252C_RVRngRfeprTTM%252C_%253BUfAylDiBEvZIEM%252Cwcri1DRA-RrvRM%252C_%253By7-l1LKrhJJZUM%252CfyMNFpQ0-F0fXM%252C_%253BxnLK1gX2C7MD4M%252C7_0Bfy_K4HkgMM%252C_%253BGoLDdaHMkxnqIM%252C-x47coUNHb1Z3M%252C_%253BisYxn0zcjEZ6wM%252CssXO_nqQcBJ3uM%252C_&usg=AI4_-kTi2dN0XGvJgFa0OxNfqpV9TmOYlA&sa=X&ved=2ahUKEwipqpyd6Kj2AhVOeN4KHaSdBCsQ9QF6BAgEEAE&biw=1536&bih=714&dpr=1.25#imgrc=wzRcY9R2ANhK-M',
    },
    {
      id: 'file2',
      fileName: 'sample file2',
      fileUrl:
        'https://www.google.com/search?q=dog&sxsrf=APq-WBubv-8wmAQ2VpGnsBV-ImDY0ZoSFg:1646271763263&tbm=isch&source=iu&ictx=1&vet=1&fir=wzRcY9R2ANhK-M%252C2r6Arj4-hBjhNM%252C_%253B48lHkI24a1lDuM%252CEGY4Ty2FXT1ZkM%252C_%253BXOie6kN60_1ThM%252CyMvHGACpKSsnUM%252C_%253BAdZDAIcrJx_j4M%252CPUlX44c-WOm0fM%252C_%253B0q-6o5yeHKTpNM%252CFofFudZ0yWjNIM%252C_%253BM1gdx1TqeiwBWM%252CrCTsFF5GgDKfRM%252C_%253Bsbbc4P-cFNmHEM%252CWdQJYRL3o17gHM%252C_%253BOhtMhQNVZpcSXM%252CSytthMZdPj3fzM%252C_%253BSMMlmWDadP14fM%252C_RVRngRfeprTTM%252C_%253BUfAylDiBEvZIEM%252Cwcri1DRA-RrvRM%252C_%253By7-l1LKrhJJZUM%252CfyMNFpQ0-F0fXM%252C_%253BxnLK1gX2C7MD4M%252C7_0Bfy_K4HkgMM%252C_%253BGoLDdaHMkxnqIM%252C-x47coUNHb1Z3M%252C_%253BisYxn0zcjEZ6wM%252CssXO_nqQcBJ3uM%252C_&usg=AI4_-kTi2dN0XGvJgFa0OxNfqpV9TmOYlA&sa=X&ved=2ahUKEwipqpyd6Kj2AhVOeN4KHaSdBCsQ9QF6BAgEEAE&biw=1536&bih=714&dpr=1.25#imgrc=wzRcY9R2ANhK-M',
    },
  ]);

  const onChangeSingle = (files: IFileTypes[]) => {
    console.log(files[0]);
  };

  const onChangeMulti = (files: IFileTypes[]) => {
    console.log(files);
  };

  return (
    <div>
      <FileDragUpload id="singlefile" onChange={onChangeSingle} maxLength={1} />
      <hr />
      <FileDragUpload id="multifile" defaultFile={files} onChange={onChangeMulti} maxLength={10} />
    </div>
  );
};
