interface ICollapseContent {
  id: string;
  title: string;
  content: string;
}

export interface ICollapse {
  contents: ICollapseContent[];
}

export interface ICollapseItem {
  item: ICollapseContent;
}
