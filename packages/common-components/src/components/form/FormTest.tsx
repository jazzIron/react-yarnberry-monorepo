import styled from '@emotion/styled';
import { Button } from '../button';
import { Input } from '../input';
import { Select } from '../select';
import { Form } from './Form';
import { FormArray } from './FormArray';
import { FormItem } from './FormItem';
import { formTestData } from './formTest.data';
import { useFormHooks } from './useFormHooks';

export function FormTest() {
  const { onReset, watch, onSubmit, formData, isValid, formRef } = useFormHooks(formTestData);

  const onSubmitHandler = (data: unknown) => {
    console.log(data);
  };

  return (
    <FormTestStyled>
      <Form register={formRef} onSubmit={onSubmitHandler}>
        <>
          <FormItem
            {...formData['name']}
            render={({ value, onChange }) => {
              // console.log(value);
              return (
                <>
                  <div>
                    <label>이름</label>
                    <Input
                      inputValue={value.name}
                      onChange={(val) => onChange({ ...value, name: val })}
                    />
                    <Select
                      onChange={(val) => onChange({ ...value, position: val.value })}
                      options={[
                        {
                          disabled: false,
                          id: '1',
                          label: '간호사',
                          value: 'nurse',
                        },
                      ]}
                      defaultValue={value.position}
                    />
                  </div>
                </>
              );
            }}
          />

          <FormItem
            {...formData['id']}
            validate={[
              {
                id: 'apiCheck',
                check: (value) => value === 'test@mail.com',
                failMsg: '이메일 중복 - 다시입력',
              },
            ]}
            render={({ value, onChange }) => (
              <></>
              // <InputBtnForm
              //   onChange={onChange}
              //   id={'id'}
              //   fomLabel={'id'}
              //   formValue={value}
              //   btnLabel="중복조회"
              // />
            )}
          />

          <hr />
          <FormArray
            {...formData['advice']}
            render={({ field, prepend, append, formArrayData, onRemove }) => {
              return (
                <div>
                  <section>
                    <label>URL : &emsp;</label>
                    <FormItem
                      {...formArrayData['url']}
                      render={({ value, onChange }) => <input value={value} onChange={onChange} />}
                    />
                    <FormItem
                      {...formArrayData['url2']}
                      render={({ value, onChange }) => <input value={value} onChange={onChange} />}
                    />
                    <Button
                      type="button"
                      label="append"
                      onClick={() =>
                        append({
                          url: ``,
                        })
                      }
                    />
                    <Button type="button" label="remove" onClick={onRemove} />
                  </section>

                  <hr />
                </div>
              );
            }}
          />
        </>
      </Form>
    </FormTestStyled>
  );
}

const FormTestStyled = styled.div``;
