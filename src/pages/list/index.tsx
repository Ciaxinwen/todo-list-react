import { Layout } from "antd";
import styles from "./index.module.scss";
import { GroupList } from "./components/GroupList";
import { TodoList } from "./components/TodoList";

export const List = () => {
  const { Sider, Content } = Layout;

  return (
    <Layout className={styles.list}>
      <Sider width="20%" theme="light">
        <GroupList />
      </Sider>
      <Content style={{ backgroundColor: "#edf2fa" }}>
        <TodoList />
      </Content>
    </Layout>
  );
};
