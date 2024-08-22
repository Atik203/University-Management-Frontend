import { Form, Select } from "antd";
import { FC } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

export type TSelectProps = {
  label: string;
  name: string;
  disabled?: boolean;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  mode?: "multiple" | "tags" | undefined;
};

const OpenSelectWithWatch: FC<TSelectProps> = ({
  label,
  name,
  options,
  disabled = false,
  mode = undefined,
}) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label} style={{ marginBottom: "1rem" }}>
          <Select
            mode={mode}
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

export default OpenSelectWithWatch;
