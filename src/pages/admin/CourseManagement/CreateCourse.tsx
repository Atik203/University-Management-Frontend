import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";
import OpenInput from "../../../components/form/OpenInput";
import OpenSelect from "../../../components/form/OpenSelect";
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import OpenForm from "./../../../components/form/OpenForm";

const CreateCourse = () => {
  const [CreateCourse] = useCreateCourseMutation();

  const { data, isFetching, isLoading } = useGetAllCoursesQuery(undefined);

  const courses = data?.data;

  const preCourseOptions = courses?.map((course) => ({
    label: course.title + " " + course.prefix + "" + course.code,
    value: course._id,
  }));

  if (isLoading || isFetching) return <div>Loading...</div>;

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");

    try {
      const submitData = {
        ...data,
        credits: Number(data.credits),
        code: Number(data.code),
        preRequisiteCourses: Array.isArray(data.preRequisiteCourses)
          ? data.preRequisiteCourses.map((course: string) => ({
              course,
            }))
          : [],
      };
      const result = await CreateCourse(submitData).unwrap();
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
          <OpenSelect
            mode="multiple"
            label="Pre-requisite"
            name="preRequisiteCourses"
            options={preCourseOptions}
          />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
