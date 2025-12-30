import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo, TodoGroup } from "@/types/todo";
import { initTodoListData } from "./todoData";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: initTodoListData,
    currentGroupId: initTodoListData[0].id,
  },
  reducers: {
    addTodoGroup: (state, action: PayloadAction<TodoGroup>) => {
      state.todoList.push(action.payload);
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      const { id } = action.payload;
      const group = state.todoList.find((item) => item.id === id);
      if (group) {
        group.children.push(action.payload);
      }
    },
    setCurrentGroupId: (state, action: PayloadAction<string>) => {
      state.currentGroupId = action.payload;
    },
    updateTodoGroup: (state, action: PayloadAction<TodoGroup>) => {
      const { id, groupName } = action.payload;
      const group = state.todoList.find((item) => item.id === id);
      if (group) {
        group.groupName = groupName;
      }
    },
    deleteTodoGroup: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.todoList = state.todoList.filter((item) => item.id !== id);
    },
  },
});

export const {
  addTodoGroup,
  addTodo,
  setCurrentGroupId,
  updateTodoGroup,
  deleteTodoGroup,
} = todoSlice.actions;

export default todoSlice.reducer;
