import { Input } from "antd";
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
        marginBottom: "2rem",
        display: "flex",
        gap: "1rem",
        minWidth: "300px",
      }}
    >
      {label ? (
        <label
          style={{
            color: "black",
            fontWeight: "600",
            fontSize: "18px",
            minWidth: "80px",
          }}
        >
          {label}
        </label>
      ) : null}
      <Controller
        name={name}
        render={({ field }) => {
          return (
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
          );
        }}
      />
    </div>
  );
};

export default OpenInput;
