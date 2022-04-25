import styled from '@emotion/styled';
import { Controller, useController, useFieldArray, useForm, useWatch } from 'react-hook-form';

const defaultValue = { test: [{ firstName: 'default' }] };

interface IInputProps {
  control: any;
  index: number;
  field: any;
}

const ConditionalInput = ({ control, index, field: formField }: IInputProps) => {
  const { field, fieldState, formState } = useController({
    name: `test.${index}.firstName`,
    rules: { maxLength: 10 },
    control,
  });

  const { onChange, onBlur, value, ref } = field;
  const { invalid, isTouched, isDirty, error } = fieldState;
  const { submitCount } = formState; //submit일 때 1, 아닐 때 0

  // const value = useWatch({
  //   name: 'test',
  //   control,
  // });

  return (
    <>
      <input value={value} onChange={onChange} />
      {isDirty && error && <span>errors</span>}
    </>
    // <Controller
    //   control={control}
    //   name={`test.${index}.firstName`}
    //   rules={{ maxLength: 10, required: true }}
    //   render={({ field, fieldState }) => {
    //     console.log(fieldState);
    //     // value?.[index]?.checkbox === 'on' ? <input {...field} /> : null;
    //     return <input {...field} />;
    //   }}
    //   defaultValue={formField.firstName}
    // />
  );
};

export function FormArraySample() {
  const { handleSubmit, control, register, watch } = useForm({
    defaultValues: defaultValue,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { fields, append, prepend } = useFieldArray({
    control,
    name: 'test',
  });
  const onSubmit = (data: any) => console.log(data);

  console.log(watch());

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          const id = `test.${index}.checkbox`;
          return (
            <div key={field.id}>
              <section>
                <label htmlFor={id}>Show Input</label>
                {/* <input
                  type="checkbox"
                  value="on"
                  id={id}
                  {...register(id)}
                  defaultChecked={Boolean(field.checked)}
                /> */}
                <ConditionalInput {...{ control, index, field }} />
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      firstName: `append value${index}`,
                    })
                  }
                >
                  append
                </Button>
              </section>

              <hr />
            </div>
          );
        })}

        <Button
          type="button"
          onClick={() =>
            prepend({
              firstName: 'prepend value',
            })
          }
        >
          prepend
        </Button>

        <input type="submit" />
      </form>
    </div>
  );
}

const FormArraySampleStyled = styled.div``;
const Button = styled.button`
  border: 1px solid black;
  padding: 5px 10px;
  float: right;
`;
