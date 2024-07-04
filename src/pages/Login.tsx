import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });

  const [login, { data, error }] = useLoginMutation();

  console.log(data);
  console.log(error);

  const onSubmit = (data) => {
    console.log(data);
    login(data);
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
