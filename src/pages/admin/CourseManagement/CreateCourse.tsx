import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";
import OpenInput from "../../../components/form/OpenInput";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useCreateCourseMutation } from "../../../redux/features/admin/courseManagement.api";
import OpenForm from "./../../../components/form/OpenForm";

const CreateCourse = () => {
  const [CreateCourse] = useCreateCourseMutation();

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
        credits: Number(data.credits),
        code: Number(data.code),
      };
      const result = await CreateCourse(semesterData).unwrap();
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
          <OpenInput label="Course Title" name="title" type="text" />
          <OpenInput label="Course Prefix" name="prefix" type="text" />
          <OpenInput label="Course Code" name="code" type="text" />
          <OpenInput label="Credit" name="credits" type="text" />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
