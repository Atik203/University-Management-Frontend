import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

type TLogin = {
  id: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "password123",
    },
  });

  const dispatch = useAppDispatch();

  const [login, { error }] = useLoginMutation();

  if (error) {
    return <h1 style={{ textAlign: "center" }}> {String(error)} </h1>;
  }

  const onSubmit = async (data: TLogin) => {
    const res = await login(data).unwrap();
    const token = res.data.accessToken;
    const user = verifyToken(token);
    dispatch(
      setUser({
        user,
        token,
      })
    );
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
