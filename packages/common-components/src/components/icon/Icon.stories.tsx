import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Icon, ICON_LIST } from '.';

export default {
  title: `Components/Icon`,
  component: Icon,
  argTypes: {
    icon: {
      options: ICON_LIST,
      defaultValue: ICON_LIST.repo,
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const IconList = () => {
  const onClick = (name: string) => {
    const textField = document.createElement('textarea');
    textField.innerText = name;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  return (
    <>
      {Object.keys(ICON_LIST).map((icon, idx) => (
        <IcocWrapper key={idx} onClick={() => onClick(icon)}>
          <Icon icon={ICON_LIST[icon]} />
          &emsp;{icon}
        </IcocWrapper>
      ))}
    </>
  );
};

const IcocWrapper = styled.div`
  padding: 5px;
  cursor: pointer;
  :hover {
    background-color: aliceblue;
  }
`;
