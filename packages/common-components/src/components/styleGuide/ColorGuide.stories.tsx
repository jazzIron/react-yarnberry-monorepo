import { theme as Themes } from '@common/styles';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ColorGuide } from './ColorGuide';

export default {
  title: `StyleGuide/ColorGuide`,
  component: ColorGuide,
} as ComponentMeta<typeof ColorGuide>;

const Template: ComponentStory<typeof ColorGuide> = (args) => {
  const colorStyles = Themes.colors;
  return (
    <>
      {Object.keys(colorStyles).map((key) => {
        const type = key as any;
        return <ColorGuide key={key} type={type} />;
      })}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
