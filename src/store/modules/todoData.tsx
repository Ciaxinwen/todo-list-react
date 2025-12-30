import type { TodoGroup } from "@/types/todo";
import { v4 as uuidv4 } from "uuid";

export const initTodoListData: TodoGroup[] = [
  {
    id: uuidv4(),
    groupName: "我的一天",
    defaultGroup: true,
    icon: {
      name: "SunOutlined",
      style: { color: "#5d71c0" },
    },
    children: [],
  },
  {
    id: uuidv4(),
    groupName: "重要",
    defaultGroup: true,
    icon: {
      name: "StarOutlined",
      style: { color: "#b24b6b" },
    },
    children: [],
  },
  {
    id: uuidv4(),
    groupName: "计划内",
    defaultGroup: true,
    icon: {
      name: "ClockCircleOutlined",
      style: { color: "#428885" },
    },
    children: [],
  },
  {
    id: uuidv4(),
    groupName: "已分配给我",
    defaultGroup: true,
    icon: {
      name: "UserOutlined",
      style: { color: "#4b8c70" },
    },
    children: [],
  },
  {
    id: uuidv4(),
    groupName: "任务",
    defaultGroup: true,
    icon: {
      name: "HomeOutlined",
      style: { color: "#546671" },
    },
    children: [],
  },
];

console.log(initTodoListData);
