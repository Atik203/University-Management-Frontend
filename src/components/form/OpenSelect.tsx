import { Form, Select } from "antd";
import { FC } from "react";

type SelectProps = {
  label: string;
};

const OpenSelect: FC<SelectProps> = ({ label }) => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Form.Item label={label} style={{ marginBottom: "1rem" }}>
      <Select
        style={{
          width: "100%",
          border: "1px solid black",
          color: "black",
          fontSize: "16px",
        }}
        onChange={handleChange}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
    </Form.Item>
  );
};

export default OpenSelect;
