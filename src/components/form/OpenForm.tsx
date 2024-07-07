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
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default OpenForm;
