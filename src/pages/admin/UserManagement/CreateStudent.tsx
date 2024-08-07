import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import OpenForm from "../../../components/form/OpenForm";
import OpenInput from "../../../components/form/OpenInput";
import { createStudentValidationSchema } from "../../../schemas/userManagement.schema";

const CreateStudent = () => {
  const student = {
    password: "password123",
    student: {
      name: {
        firstName: "John",
        middleName: "Doe",
        lastName: "Smith",
      },
      gender: "male",
      dateOfBirth: "2000-01-01",
      email: "johndone2@gmail.com",
      contactNo: "1234567890",
      emergencyContactNo: "0987654321",
      bloodGroup: "A+",
      presentAddress: "123 Street, City, State, Country",
      permanentAddress: "456 Avenue, City, State, Country",
      guardian: {
        fatherName: "Robert Smith",
        fatherOccupation: "Engineer",
        fatherContactNo: "1234567890",
        motherName: "Jane Smith",
        motherOccupation: "Doctor",
        motherContactNo: "0987654321",
      },
      localGuardian: {
        name: "Alice Johnson",
        occupation: "Teacher",
        contactNo: "1234567890",
        address: "789 Street, City, State, Country",
      },
      admissionSemester: "6662d756fd67954d2f594983",
      academicDepartment: "6662e9bf5b7ca57ef3244733",
    },
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    // for checking console.log(Object.entries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <OpenForm
          onSubmit={onSubmit}
          resolver={zodResolver(createStudentValidationSchema)}
        >
          <Row gutter={8}>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput label="First Name" name="firstName" type="text" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput label="Middle Name" name="middleName" type="text" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput label="Last Name" name="lastName" type="text" />
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
