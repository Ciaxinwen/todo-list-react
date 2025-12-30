import type { IconName } from "@/components/Icon/AntIconRender";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  content: string;
  createTime: Date;
};

export type TodoGroup = {
  id: string;
  groupName: string;
  defaultGroup?: boolean;
  icon?: {
    name: IconName;
    style: React.CSSProperties;
  };
  children: Todo[];
};
