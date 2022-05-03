import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Alert } from './Alert';
import { ALERT_THEME } from './Alert_types';

export default {
  title: `components/Alert`,
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const CONFIRM = Template.bind({});
CONFIRM.args = {
  isOpen: true,
  theme: ALERT_THEME.CONFIRM,
  title: 'alert title',
  contents: ['alert contents'],
  btnOk: {
    label: '확인',
    onClick: () => console.log('click ok'),
  },
  btnClose: {
    label: '닫기',
    onClick: (state: boolean) => console.log(`click close ${state}`),
  },
};

export const NOTICE = Template.bind({});
NOTICE.args = {
  isOpen: true,
  theme: ALERT_THEME.NOTICE,
  title: 'alert title',
  contents: ['alert contents'],
  elements: <div style={{ padding: '5px', backgroundColor: 'beige' }}>alert element</div>,
  btnOk: {
    label: '확인',
    onClick: () => console.log('click ok'),
  },
};

export const SUCCESS = Template.bind({});
SUCCESS.args = {
  isOpen: true,
  theme: ALERT_THEME.SUCCESS,
  title: 'alert title',
  contents: ['alert contents'],
  btnOk: {
    label: '확인',
    onClick: () => console.log('click ok'),
  },
};
