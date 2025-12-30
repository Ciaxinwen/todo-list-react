import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./modules/todoSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 默认是 localStorage

// 持久化配置
const persistConfig = {
  key: "root", // 存储的键名
  storage, // 存储方式
  whitelist: ["todo"], // 需要持久化的reducer
  blacklist: [], // 不需要持久化的reducer
};

// 创建 root reducer
const rootReducer = combineReducers({
  todo: todoReducer,
});

// 使用 persistReducer 包装 root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略 redux-persist 的动作类型
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

// 导出 RootState 类型
export type RootState = ReturnType<typeof store.getState>;
