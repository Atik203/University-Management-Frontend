import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import OpenSelect from "../../../components/form/OpenSelect";
import OpenForm from "./../../../components/form/OpenForm";

const CreateAcademicSemester = () => {
  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={7}>
        <OpenForm onSubmit={onSubmit}>
          <OpenSelect label="Name" />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
