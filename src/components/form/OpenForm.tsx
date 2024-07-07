import { ReactNode } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import { SubmitHandler } from "react-hook-form";

const OpenForm = ({
  onSubmit,
  children,
}: {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
}) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default OpenForm;
