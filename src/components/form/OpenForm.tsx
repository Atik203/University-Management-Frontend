/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import { SubmitHandler } from "react-hook-form";
type TFormConfig = {
  defaultValues?: Record<string, unknown>;
  resolver?: any;
};
type TOpenFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const OpenForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TOpenFormProps) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
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
