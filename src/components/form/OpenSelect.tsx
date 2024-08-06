import { Form, Select } from "antd";
import { FC } from "react";
import { Controller } from "react-hook-form";

type SelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const OpenSelect: FC<SelectProps> = ({ label, name, options }) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label} style={{ marginBottom: "1rem" }}>
          <Select
            style={{
              width: "100%",
              border: "1px solid black",
              color: "black",
              fontSize: "16px",
            }}
            size="large"
            {...field}
            options={options}
          />
        </Form.Item>
      )}
    />
  );
};

export default OpenSelect;
