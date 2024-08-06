import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import OpenInput from "../../../components/form/OpenInput";
import OpenForm from "./../../../components/form/OpenForm";

const CreateAcademicSemester = () => {
  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={7}>
        <OpenForm onSubmit={onSubmit}>
          <OpenInput label="Semester Name" type="text" name="name" />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
