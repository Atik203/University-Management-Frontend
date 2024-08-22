import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import OpenForm from "../components/form/OpenForm";
import OpenInput from "../components/form/OpenInput";
import { useChangePasswordMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ChangePassword] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Changing password...");

    try {
      const res = await ChangePassword(data).unwrap();
      if (res.success) {
        dispatch(logout());
        toast.success(res.message, { id: toastId });
        navigate("/login");
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex
      align="middle"
      justify="center"
      style={{ marginTop: "100px", textAlign: "center" }}
    >
      <Col span={8}>
        <OpenForm onSubmit={onSubmit}>
          <OpenInput name="oldPassword" label="Old Password" type="password" />
          <OpenInput name="newPassword" label="New Password" type="password" />

          <Button
            style={{
              marginTop: "10px",
              backgroundColor: "#1890ff",
              color: "white",
            }}
            htmlType="submit"
          >
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Flex>
  );
};

export default ChangePassword;
