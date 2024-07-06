import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "password123",
    },
  });

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
    <form style={{ margin: "auto" }} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">Id:</label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
};

export default Login;
