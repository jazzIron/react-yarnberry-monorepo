import { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { FormArrayType, IFormArray } from './Form_types';

export function FormArray({ control, id, option, render, mode }: IFormArray) {
  const { fields, append, prepend, remove } = useFieldArray({
    control: control,
    name: id,
  });

  let defaultValue = {};
  useEffect(() => {
    option.forEach((el: FormArrayType) => {
      defaultValue = { ...defaultValue, [el.name]: el.defaultValue };
    });
  }, [option]);

  const onRemove = (index: number) => {
    remove(index);
    if (index === 0) {
      append(defaultValue);
    }
  };
  return (
    <>
      {fields.map((field, index) => {
        let temp = {};
        option.forEach((el: FormArrayType) => {
          temp = {
            ...temp,
            [el.name]: {
              id: `${id}.${index}.${el.name}`,
              control,
              mode,
              option: {
                ...el,
              },
            },
          };
        });
        return render({
          field,
          append,
          prepend,
          formArrayData: temp,
          onRemove: () => onRemove(index),
        });
      })}
    </>
  );
}
