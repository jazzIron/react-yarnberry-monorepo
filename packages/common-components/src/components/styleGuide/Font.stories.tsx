import { theme as Themes, colors, cssx, fonts } from '@common/styles';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FontGuide } from './FontGuide';
import styled from '@emotion/styled';

export default {
  title: `StyleGuide/FontGuide`,
  component: FontGuide,
} as ComponentMeta<typeof FontGuide>;

const Template: ComponentStory<typeof FontGuide> = (args) => {
  const fontTypes = Themes.fonts;

  const FontContentInfoStyled = styled.div`
    padding: 20px;
  `;

  return (
    <>
      <FontContentInfoStyled>
        <h2>기본 스크린의 좌우 공통 마진은 20pt로 사용합니다.</h2>
      </FontContentInfoStyled>

      {Object.keys(fontTypes).map((key) => {
        const type = key as any;
        return (
          <>
            <FontGuide key={key} type={type} />
          </>
        );
      })}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
