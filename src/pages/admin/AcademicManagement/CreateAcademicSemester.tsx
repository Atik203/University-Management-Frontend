import { Button } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import OpenInput from "../../../components/form/OpenInput";
import OpenForm from "./../../../components/form/OpenForm";

const CreateAcademicSemester = () => {
  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <OpenForm onSubmit={onSubmit}>
      <OpenInput label="Semester Name" type="text" name="name" />

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </OpenForm>
  );
};

export default CreateAcademicSemester;
