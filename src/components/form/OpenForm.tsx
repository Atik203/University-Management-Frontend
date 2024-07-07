import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

const OpenForm = ({
  onSubmit,
  children,
}: {
  onSubmit: (data: any) => void;
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
