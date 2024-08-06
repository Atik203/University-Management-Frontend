import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import { SubmitHandler } from "react-hook-form";
type TFormConfig = {
  defaultValues?: Record<string, unknown>;
};
type TOpenFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const OpenForm = ({ onSubmit, children, defaultValues }: TOpenFormProps) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <Form
        style={{
          fontWeight: "bold",
          fontSize: "1.25rem",
        }}
        layout="vertical"
        onFinish={methods.handleSubmit(onSubmit)}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default OpenForm;
