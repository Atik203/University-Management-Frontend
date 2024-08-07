import { Form, Select } from "antd";
import { FC } from "react";
import { Controller } from "react-hook-form";

export type TSelectProps = {
  label: string;
  name: string;
  disabled?: boolean;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
};

const OpenSelect: FC<TSelectProps> = ({
  label,
  name,
  options,
  disabled = false,
}) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label} style={{ marginBottom: "1rem" }}>
          <Select
            style={{
              width: "100%",
              border: "1px solid black",
              color: "black",
              fontSize: "16px",
            }}
            size="large"
            disabled={disabled}
            {...field}
            options={options}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default OpenSelect;
