import styled from '@emotion/styled';
import { theme as Themes, colors, fonts } from '@common/styles';
import { isEmpty } from 'lodash';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RENDER_STATE } from '.';
import { formValidate } from './FormUtil';
import { IFormItem, IValidate } from './Form_types';
import { ILNG } from '../../i18n';

export function FormItem({ id, control, option, render, mode, useMessage, validate }: IFormItem) {
  const { t } = useTranslation();
  let rules: IValidate = formValidate(option.validate);
  if (validate) {
    validate.forEach((validObj) => {
      const addRules: IValidate = {
        [validObj.id]: (value) => validObj.check(value) || validObj.failMsg,
      };
      rules = { ...rules, ...addRules };
    });
  }

  const { field, fieldState, formState } = useController({
    name: id,
    rules: {
      validate: {
        ...rules,
      },
    },
    control,
  });

  const { onChange, onBlur, value, ref } = field;
  const { invalid, isTouched, isDirty, error } = fieldState;
  const { submitCount } = formState; //submit일 때 1, 아닐 때 0

  const renderState = !isDirty
    ? RENDER_STATE.DEFAULT
    : !error
    ? RENDER_STATE.SUCCESS
    : RENDER_STATE.ERROR;

  const isSubmit = mode === 'onChange' ? 1 : submitCount;
  const children = render({ ...field, ...fieldState, renderState });

  return (
    <>
      <FormItemStyled>
        {children}
        {useMessage && (
          <>
            {error && !isEmpty(error.message) && (
              <ErrorMessage>{t(error.message as ILNG)}</ErrorMessage>
            )}
            {isDirty && !error && option.sucMsg && (
              <SucMessage>{t(option.sucMsg as ILNG)}</SucMessage>
            )}
          </>
        )}
      </FormItemStyled>
    </>
  );
}

FormItem.defaultProps = {
  useMessage: true,
};

const FormItemStyled = styled.div`
  /* margin-top: 15px; */
`;

const ErrorMessage = styled.span`
  display: block;
  margin: 5px 0 15px;
  color: ${colors.ays_point_01};
  ${fonts.body_03}
`;
const SucMessage = styled.span`
  margin: 5px 0 15px;
  color: ${colors.ays_maincolor};
  ${fonts.body_03}
`;

const DefaultMessage = styled.span``;
