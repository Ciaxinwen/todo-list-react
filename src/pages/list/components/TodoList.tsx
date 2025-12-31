import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import styles from "./TodoList.module.scss";
import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  Modal,
  Space,
  Switch,
  type CheckboxProps,
} from "antd";
import { RightOutlined, FormOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  addTodo,
  deleteTodo,
  setTodoStatus,
  updateTodo,
} from "@/store/modules/todoSlice";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import type { Todo } from "@/types/todo";

const Item = ({
  todo,
  showModal,
}: {
  todo: Todo;
  showModal: (todo: Todo) => void;
}) => {
  const dispatch = useDispatch();

  const onChange: CheckboxProps["onChange"] = (e) => {
    dispatch(setTodoStatus({ id: todo.id, completed: e.target.checked }));
  };

  return (
    <div className={styles.todoItem}>
      <Checkbox defaultChecked={todo.completed} onChange={onChange}>
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.title}
        </span>
      </Checkbox>
      <Button type="text" onClick={() => showModal(todo)}>
        <FormOutlined />
      </Button>
    </div>
  );
};

export const TodoList = () => {
  const { TextArea } = Input;

  const dispatch = useDispatch();
  const currentGroup = useSelector((state: RootState) =>
    state.todo.todoList.find((item) => item.id === state.todo.currentGroupId)
  );
  const todoListOfCompleted = useSelector((state: RootState) =>
    state.todo.todoList
      .find((item) => item.id === state.todo.currentGroupId)
      ?.children?.filter((item) => item.completed)
  );
  const todoListOfNotCompleted = useSelector((state: RootState) =>
    state.todo.todoList
      .find((item) => item.id === state.todo.currentGroupId)
      ?.children?.filter((item) => !item.completed)
  );

  const [expand, setExpand] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        dispatch(
          addTodo({
            id: uuidv4(),
            title: inputValue,
            completed: false,
            content: "",
            createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          })
        );
        setInputValue("");
      }
    }
  };

  // 修改抽屉
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = async (todo: Todo) => {
    setCurrentTodo(todo);
    await form.setFieldsValue(todo);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onConfirmTodo = async () => {
    form.validateFields().then((values) => {
      dispatch(updateTodo({ ...currentTodo, ...values }));
      setOpen(false);
      setCurrentTodo(null);
    });
  };

  const onDeleteTodo = () => {
    if (currentTodo) {
      Modal.confirm({
        title: "确认删除吗？",
        okText: "确认",
        cancelText: "取消",
        okType: "danger",
        onOk: () => {
          dispatch(deleteTodo(currentTodo.id));
          setOpen(false);
          setCurrentTodo(null);
        },
      });
    }
  };

  return (
    <>
      <div className={styles.todoList}>
        <div className={styles.header}>
          <h2 className={styles.title}>{currentGroup?.groupName}</h2>
          {/* <div className={styles.operation}>666</div> */}
        </div>
        <div className={styles.content}>
          {todoListOfNotCompleted?.length ? (
            <div style={{ marginBottom: 16 }}>
              {todoListOfNotCompleted.map((item) => (
                <Item key={item.id} todo={item} showModal={showDrawer} />
              ))}
            </div>
          ) : null}
          {todoListOfCompleted?.length ? (
            <Button size="large" onClick={() => setExpand(!expand)}>
              <RightOutlined
                style={{
                  rotate: expand ? "0deg" : "90deg",
                  transition: "rotate 0.2s ease-in-out",
                }}
              />
              已完成 ({todoListOfCompleted?.length})
            </Button>
          ) : null}
          {!expand && todoListOfCompleted?.length ? (
            <div style={{ marginTop: 16 }}>
              {todoListOfCompleted.map((item) => (
                <Item key={item.id} todo={item} showModal={showDrawer} />
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.footer}>
          <TextArea
            placeholder="添加任务"
            size="large"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>

      <Drawer
        title="修改"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onConfirmTodo} type="primary">
              确认
            </Button>
            <Button onClick={onDeleteTodo} type="primary" danger>
              删除
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="任务名称"
            name="title"
            rules={[{ required: true, message: "请输入任务名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="任务内容" name="content">
            <TextArea placeholder="请输入任务内容" />
          </Form.Item>
          <Form.Item label="完成状态" name="completed">
            <Switch />
          </Form.Item>
          <Form.Item label="创建时间" name="createTime">
            <Input disabled />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
