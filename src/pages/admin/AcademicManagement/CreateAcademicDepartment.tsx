import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";
import OpenForm from "../../../components/form/OpenForm";
import OpenInput from "../../../components/form/OpenInput";
import OpenSelect, { TSelectProps } from "../../../components/form/OpenSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";

const CreateAcademicDepartment = () => {
  const [AddAcademicDepartment] = useAddAcademicDepartmentMutation();

  const { data, isFetching, isLoading } =
    useGetAllAcademicFacultiesQuery(undefined);

  const academicFaculties = data?.data;

  const academicFacultiesOptions = academicFaculties?.map((faculty) => ({
    label: faculty.name,
    value: faculty._id,
  }));

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic department...");
    try {
      const submitData = {
        name: data.name,
        academicFaculty: data.academicFaculty,
      };

      const result = await AddAcademicDepartment(submitData).unwrap();
      if (result?.data?.name) {
        toast.success(result.message, {
          id: toastId,
        });
      } else {
        toast.error(result?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (isLoading || isFetching) {
    return <h4>Loading...</h4>;
  }

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <OpenForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <OpenInput name="name" label="Department Name" type="text" />

          <OpenSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultiesOptions as TSelectProps["options"]}
          />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
