import { ComponentStory, ComponentMeta } from '@storybook/react';
import { List } from './List';

const listData: any = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'www.naver.com',
    title: `title ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'dess',
    content: 'content',
  });
}

export default {
  title: `Components/List`,
  component: List,
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  dataSource: listData,
  footer: <div>footer 영역</div>,
  header: <div>header 영역</div>,
};
