import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import OpenSelect from "../../../components/form/OpenSelect";
import OpenForm from "./../../../components/form/OpenForm";

const nameOptions = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: (currentYear + number).toString(),
  label: (currentYear + number).toString(),
}));

const CreateAcademicSemester = () => {
  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    const name = nameOptions[Number(data?.name) - 1].label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
    };
  };

  return (
    <Flex justify="center" align="center">
      <Col span={7}>
        <OpenForm onSubmit={onSubmit}>
          <OpenSelect label="Name" name="name" options={nameOptions} />
          <OpenSelect label="Year" name="year" options={yearOptions} />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
