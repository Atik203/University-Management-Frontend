import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TOpenInputProps = {
  type: string;
  name: string;
  label?: string;
};

const OpenInput = ({ type, name, label }: TOpenInputProps) => {
  return (
    <div
      style={{
        marginBottom: "1rem",
      }}
    >
      <Controller
        name={name}
        render={({ field }) => {
          return (
            <Form.Item
              label={label}
              style={{
                color: "black",
                fontSize: "16px",
              }}
            >
              <Input
                {...field}
                placeholder={name}
                type={type}
                name={name}
                id={name}
                style={{
                  width: "100%",
                  border: "2px solid black",
                  borderRadius: "5px",
                  color: "black",
                  fontSize: "16px",
                }}
              />
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default OpenInput;
