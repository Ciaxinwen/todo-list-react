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

    addTodo: (state, action: PayloadAction<Todo>) => {
      const group = state.todoList.find(
        (item) => item.id === state.currentGroupId
      );
      if (group) {
        group.children.push(action.payload);
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const todo = state.todoList.find(
        (item) => item.id === state.currentGroupId
      );
      if (todo) {
        const todoItemIndex = todo.children.findIndex(
          (item) => item.id === action.payload.id
        );
        if (todoItemIndex !== -1) {
          todo.children[todoItemIndex] = action.payload;
        }
      }
    },
    setTodoStatus: (
      state,
      action: PayloadAction<{ id: string; completed: boolean }>
    ) => {
      const { id, completed } = action.payload;
      const todo = state.todoList.find(
        (item) => item.id === state.currentGroupId
      );
      if (todo) {
        const todoItem = todo.children.find((item) => item.id === id);
        if (todoItem) {
          todoItem.completed = completed;
        }
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const todo = state.todoList.find(
        (item) => item.id === state.currentGroupId
      );
      if (todo) {
        todo.children = todo.children.filter((item) => item.id !== id);
      }
    },
  },
});

export const {
  addTodoGroup,
  addTodo,
  setCurrentGroupId,
  updateTodoGroup,
  deleteTodoGroup,
  setTodoStatus,
  deleteTodo,
  updateTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
