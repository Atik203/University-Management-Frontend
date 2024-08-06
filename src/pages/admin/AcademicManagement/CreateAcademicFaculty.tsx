import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";
import OpenForm from "../../../components/form/OpenForm";
import OpenInput from "../../../components/form/OpenInput";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";

const CreateAcademicFaculty = () => {
  const [AddAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic faculty...");
    try {
      const submitData = {
        name: data.name,
      };
      const result = await AddAcademicFaculty(submitData).unwrap();
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

  return (
    <Flex justify="center" align="center">
      <Col span={8}>
        <OpenForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <OpenInput name="name" label="Faculty Name" type="text" />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
