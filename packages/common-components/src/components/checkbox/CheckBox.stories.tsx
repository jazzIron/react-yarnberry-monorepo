import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ICON_LIST } from '../icon';
import { CheckBox } from './CheckBox';
// import { CheckList } from './CheckList';
// import { checkListSampleOptions } from './checkList.data';
import { CHECKBOX_TXT_SIZE } from '.';

export default {
  title: `Components/CheckBox`,
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'test',
};

export const Suffiex = Template.bind({});
Suffiex.args = {
  label: 'test suffix',
  suffixIcon: ICON_LIST.icn_arrow_58_x_58,
  onClickSuffix: () => console.log('click Suffix'),
};

export const textSmall = Template.bind({});
textSmall.args = {
  label: 'Test',
  textSize: CHECKBOX_TXT_SIZE.SMALL,
};
// const checkListProps = {
//   suffixIcon: ICON_LIST.icn_arrow_58_x_58,
//   options: checkListSampleOptions(),
//   onChange: (value: string[]) => console.log('checkedValue:', value),
//   allRequiredCheck: (value: boolean) => console.log('isAllrequiredCheck : ', value),
//   masterLabel: 'master checkBox',
// };
// export const checkList = () => <CheckList {...checkListProps} />;
