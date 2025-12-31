import { RouterProvider } from "react-router";
import { router } from "./router";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            lightSiderBg: "#f4f4f4",
          },
        },
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  );
}

export default App;
