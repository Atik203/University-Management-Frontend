import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import OpenForm from "../components/form/OpenForm";
import OpenInput from "../components/form/OpenInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
const defaultValues = {
  id: "A-0001",
  password: "password123",
};

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");

    try {
      const res = await login(data).unwrap();
      const token = res.data.accessToken;
      const user = verifyToken(token) as TUser;
      dispatch(
        setUser({
          user,
          token,
        })
      );
      toast.success("Login Successful", { id: toastId, duration: 3000 });
      navigate(`/${user.role}/dashboard/`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 3000 });
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <OpenForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <OpenInput type="text" name="id" label="ID " />

        <OpenInput type="text" name="password" label="Password " />

        <Button
          type="primary"
          style={{
            width: "100%",
            height: "3rem",
            background: "black",
            color: "white",
            fontSize: "1.5",
          }}
          size="large"
          shape="round"
          htmlType="submit"
        >
          Submit
        </Button>
      </OpenForm>
    </Row>
  );
};

export default Login;
