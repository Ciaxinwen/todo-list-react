import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export const TodoList = () => {
  const { todoList, currentGroupId } = useSelector(
    (state: RootState) => state.todo
  );

  return <div>{todoList.find(item => item.id === currentGroupId)?.groupName}</div>;
};
