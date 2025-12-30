import { Button } from "antd";
import styles from "./index.module.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <h1>欢迎来到待办列表</h1>

      <Button
        type="link"
        size="large"
        icon={<ArrowRightOutlined />}
        onClick={() => navigate("/list")}
      >
        开始
      </Button>
    </div>
  );
};
