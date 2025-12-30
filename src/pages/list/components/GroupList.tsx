import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Input,
  Modal,
  type MenuProps,
} from "antd";
import styles from "./GroupList.module.scss";
import type { TodoGroup } from "@/types/todo";
import {
  addTodoGroup,
  deleteTodoGroup,
  setCurrentGroupId,
  updateTodoGroup,
} from "@/store/modules/todoSlice";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AntIconRender } from "@/components/Icon/AntIconRender";

const Item = ({
  group,
  onRename,
  onDelete,
}: {
  group: TodoGroup;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
}) => {
  const { currentGroupId } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  const IconComponent = (
    <AntIconRender
      name={group.icon?.name || "UnorderedListOutlined"}
      style={group.icon?.style || { color: "#0881d9" }}
    />
  );

  const items: MenuProps["items"] = [
    {
      label: "重命名列表",
      key: "1",
    },
    {
      label: "删除列表",
      key: "2",
      danger: true,
    },
  ];

  const onClick: MenuProps["onClick"] = (data) => {
    if (data.key === "1") {
      // 重命名列表
      onRename?.(group.id);
    } else if (data.key === "2") {
      // 删除列表
      onDelete?.(group.id);
    }
  };

  return (
    <Dropdown
      menu={{ items, onClick }}
      trigger={["contextMenu"]}
      disabled={group.defaultGroup}
    >
      <div
        className={
          styles.groupItem +
          (currentGroupId === group.id ? ` ${styles.isActive}` : "")
        }
        key={group.id}
        onClick={() => dispatch(setCurrentGroupId(group.id))}
      >
        {IconComponent}
        <span className={styles.groupName}>{group.groupName}</span>
      </div>
    </Dropdown>
  );
};

export const GroupList = () => {
  const { Search } = Input;
  const [form] = Form.useForm();

  const { todoList } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  const [currentGroup, setCurrentGroup] = useState<TodoGroup | null>(null);

  const onSearch = (value: string) => {
    console.log(value);
  };

  // 重命名分组
  const onRename = (id: string) => {
    const group = todoList.find((item) => item.id === id);
    if (!group) {
      return;
    }
    form.setFieldsValue({ groupName: group.groupName });
    setCurrentGroup(group);
    setIsModalOpen(true);
  };

  const onDelete = (id: string) => {
    Modal.confirm({
      title: "确认删除分组吗？",
      okText: "确认",
      cancelText: "取消",
      okType: "danger",
      onOk: () => {
        dispatch(deleteTodoGroup(id));
        setCurrentGroup(null);
        setCurrentGroupId("");
      },
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (currentGroup) {
        dispatch(
          updateTodoGroup({
            ...currentGroup,
            groupName: values.groupName,
          })
        );
      } else {
        const id = uuidv4();
        dispatch(
          addTodoGroup({
            id,
            groupName: values.groupName,
            defaultGroup: false,
            // icon: <UnorderedListOutlined style={{ color: "#1a73e8" }} />,
            children: [],
          })
        );
        dispatch(setCurrentGroupId(id));
      }
      form.resetFields();
      setIsModalOpen(false);
      setCurrentGroup(null);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setCurrentGroup(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.groupList}>
        <div className={styles.search}>
          <Search placeholder="搜索" onSearch={onSearch} />
          <Button icon={<PlusOutlined />} onClick={showModal} />
        </div>
        {todoList
          .filter((item) => item.defaultGroup)
          .map((item) => (
            <Item key={item.id} group={item} />
          ))}
        <Divider size="small" />
        {todoList
          .filter((item) => !item.defaultGroup)
          .map((item) => (
            <Item
              key={item.id}
              group={item}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
      </div>

      <Modal
        title={currentGroup?.groupName ? "重命名分组" : "添加分组"}
        okText="确认"
        cancelText="取消"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form size="large" form={form} style={{ marginTop: 16 }}>
          <Form.Item
            label="分组名称"
            name="groupName"
            rules={[{ required: true, message: "请输入分组名称" }]}
          >
            <Input placeholder="请输入分组名称" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
