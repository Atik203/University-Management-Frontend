import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import OpenForm from "../../../components/form/OpenForm";
import OpenInput from "../../../components/form/OpenInput";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";

const AcademicFaculty = () => {
  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {};

  return (
    <OpenForm onSubmit={onSubmit} resolver={zodResolver(academicFacultySchema)}>
      <OpenInput name="name" label="Faculty Name" type="text" />
    </OpenForm>
  );
};

export default AcademicFaculty;
