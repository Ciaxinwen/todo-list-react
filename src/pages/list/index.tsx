import { Layout } from "antd";
import styles from "./index.module.scss";
import { GroupList } from "./components/GroupList";
import { TodoList } from "./components/TodoList";
import { ConfigProvider } from "antd";

export const List = () => {
  const { Sider, Content } = Layout;

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            lightSiderBg: "#f4f4f4",
            /* 这里是你的组件 token */
          },
        },
      }}
    >
      <Layout className={styles.list}>
        <Sider width="20%" theme="light">
          <GroupList />
        </Sider>
        <Content>
          <TodoList />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};
