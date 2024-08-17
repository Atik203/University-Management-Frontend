import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";
import OpenDatePicker from "../../../components/form/OpenDatePicker";
import OpenInput from "../../../components/form/OpenInput";
import OpenSelect from "../../../components/form/OpenSelect";
import { statusOptions } from "../../../constants/semester";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useCreateSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import OpenForm from "./../../../components/form/OpenForm";

const CreateSemesterRegistration = () => {
  const [CreateSemesterRegistration] = useCreateSemesterRegistrationMutation();

  const { data, isFetching, isLoading } = useGetAllSemestersQuery([
    {
      name: "sort",
      value: "year",
    },
  ]);

  const semesters = data?.data;

  const semesterOptions = semesters?.map((semester) => ({
    label: semester.name + " " + semester.year,
    value: semester._id,
  }));

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");

    try {
      const semesterData = {
        ...data,
        minCredit: Number(data.minCredit),
        maxCredit: Number(data.maxCredit),
      };
      const result = await CreateSemesterRegistration(semesterData).unwrap();
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
          <OpenSelect label="Status" name="status" options={statusOptions} />
          <OpenDatePicker label="Start Date" name="startDate" />
          <OpenDatePicker label="End Date" name="endDate" />
          <OpenInput label="Minimum Credit" name="minCredit" type="text" />
          <OpenInput label="Maximum Credit" name="maxCredit" type="text" />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Flex>
  );
};

export default CreateSemesterRegistration;
