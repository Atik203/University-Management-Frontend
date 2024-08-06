import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import Sidebar from "./Sidebar";

const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const toastId = toast.loading("Logging out");

    dispatch(logout());
    toast.success("Logout Successful", {
      id: toastId,
      duration: 3000,
    });
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0 }}>
          {" "}
          <Button onClick={handleLogout}> Logout </Button>{" "}
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
