import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import OpenSelect from "../../../components/form/OpenSelect";
import { monthOptions } from "../../../constants/global";
import { nameOptions, yearOptions } from "../../../constants/semester";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import OpenForm from "./../../../components/form/OpenForm";

const CreateAcademicSemester = () => {
  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    const name = nameOptions[Number(data?.name) - 1].label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
  };

  return (
    <Flex justify="center" align="center">
      <Col span={7}>
        <OpenForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <OpenSelect label="Name" name="name" options={nameOptions} />
          <OpenSelect label="Year" name="year" options={yearOptions} />
          <OpenSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <OpenSelect
            label="End Month"
            name="endMonth"
            options={monthOptions}
          />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
