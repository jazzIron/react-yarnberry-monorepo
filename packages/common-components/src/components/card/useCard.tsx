import { useState, useEffect } from 'react';
import { SELECT_TYPE, ICard, IUseCard } from './Card_types';

export default function useCard({ type, contents }: IUseCard) {
  const [selected, setSelected] = useState<ICard[] | []>([]);
  const [Contents, setContents] = useState(contents);

  const selectCard = (card: ICard) => {
    const curSelected = selected[0];
    if (curSelected) {
      setContents((prev) =>
        prev.map((item) =>
          item.id === curSelected.id ? { ...item, isSelected: !item.isSelected } : item,
        ),
      );
    }
    if (card.isSelected) {
      setSelected([]);
      return;
    }
    setSelected([card]);
  };

  const selectMultipleCard = (card: ICard) => {
    if (card.isSelected) {
      setSelected((prev) => prev.filter((item) => item.id !== card.id));
      return;
    }
    setSelected((prev) => [...prev, card]);
  };

  const onSelect = type === SELECT_TYPE.MULTIPLE ? selectMultipleCard : selectCard;

  const onClick = (card: ICard) => {
    onSelect(card);
    setContents((prev) =>
      prev.map((item) => (item.id === card.id ? { ...item, isSelected: !item.isSelected } : item)),
    );
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return { Contents, selected, onClick };
}
