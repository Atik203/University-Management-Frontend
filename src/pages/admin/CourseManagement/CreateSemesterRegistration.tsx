import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";
import OpenSelect from "../../../components/form/OpenSelect";
import { nameOptions } from "../../../constants/semester";
import {
  useAddAcademicSemesterMutation,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import OpenForm from "./../../../components/form/OpenForm";

const CreateSemesterRegistration = () => {
  const [AddAcademicSemester] = useAddAcademicSemesterMutation();

  const { data, isFetching, isLoading } = useGetAllSemestersQuery(undefined);

  const semesters = data?.data;

  const semesterOptions = semesters?.map((semester) => ({
    label: semester.name + " " + semester.year,
    value: semester._id,
  }));

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");

    try {
      const name = nameOptions[Number(data?.name) - 1].label;
      const semesterData = {
        name,
        code: data.name,
        year: data.year,
        startMonth: data.startMonth,
        endMonth: data.endMonth,
      };
      const result = await AddAcademicSemester(semesterData).unwrap();
      if (result.success) {
        toast.success(result?.message, {
          id: toastId,
        });
      } else {
        toast.error(result?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={7}>
        <OpenForm onSubmit={onSubmit}>
          <OpenSelect
            label="Academic Semester"
            name="academicSemester"
            options={semesterOptions}
          />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Flex>
  );
};

export default CreateSemesterRegistration;
