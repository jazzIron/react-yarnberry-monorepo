interface ITabOption {
  id: string;
  text: string;
}

export interface ITab {
  activeId: string;
  options: ITabOption[];
}
