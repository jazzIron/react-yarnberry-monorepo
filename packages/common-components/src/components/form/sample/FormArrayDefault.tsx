import styled from '@emotion/styled';
import { useFieldArray, useForm } from 'react-hook-form';

type defaultValues = {
  firstName: string;
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
};

export function FormArrayDefault() {
  const { register, control, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      firstName: '',
      cart: [{ name: 'test', quantity: 1, price: 23 }],
    },
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'cart',
    control,
  });

  console.log(watch);

  const onSubmit = (data: defaultValues) => console.log(data);

  return (
    <FormArrayStyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">submit</button>
        <input {...register('firstName')} placeholder="firstName" />
        {fields.map((field, index) => {
          console.log(field);
          return (
            <FormArrayItem key={field.id}>
              <input
                placeholder="name"
                {...(register(`cart.${index}.name` as const), { required: true })}
                defaultValue={field.name}
              />
              <input
                placeholder="quantity"
                {...(register(`cart.${index}.quantity` as const),
                { required: true, valueAsNumber: true })}
                defaultValue={field.quantity}
              />
              <input
                placeholder="price"
                {...(register(`cart.${index}.price` as const),
                { required: true, valueAsNumber: true })}
                defaultValue={field.price}
              />
              <button type="button" onClick={() => remove(index)}>
                remove
              </button>
            </FormArrayItem>
          );
        })}
        <button type="button" onClick={() => append({ name: '', quantity: 0, price: 0 })}>
          append
        </button>
      </form>
    </FormArrayStyled>
  );
}

const FormArrayStyled = styled.div``;
const FormArrayItem = styled.div`
  padding: 5px 0;
  background: antiquewhite;
  display: flex;
  justify-content: space-around;
`;
