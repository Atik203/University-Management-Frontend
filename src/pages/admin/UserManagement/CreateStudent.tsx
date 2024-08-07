import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Divider, Row } from "antd";
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
      bloodGroup: "A+",

      email: "johndone2@gmail.com",
      contactNo: "1234567890",
      emergencyContactNo: "0987654321",
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
          <Divider>Personal Information</Divider>
          <Row gutter={8}>
            {/* Name */}
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput label="First Name" name="name.firstName" type="text" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Middle Name"
                name="name.middleName"
                type="text"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput label="Last Name" name="name.lastName" type="text" />
            </Col>
            {/* Blood Group,DOB,Genger */}
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput label="Blood Group" name="bloodGroup" type="text" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput label="Date Of Birth" name="dateOfBirth" type="text" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput label="Gender" name="gender" type="text" />
            </Col>

            {/* Email,Contact No,emergencyContact no */}
            <Divider>Contact Information</Divider>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput label="Email" name="email" type="email" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput label="Contact No" name="contactNo" type="text" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Emergency Contact No"
                name="emergencyContactNo"
                type="text"
              />
            </Col>

            {/* Present Address,Permanent Address */}
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Present Address"
                name="presentAddress"
                type="text"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Permanent Address"
                name="permanentAddress"
                type="text"
              />
            </Col>

            {/* Guardian Information */}
            <Divider>Guardian Information</Divider>

            {/* Father Name,Father Occupation,Father Contact No */}
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Father Name"
                name="guardian.fatherName"
                type="text"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Father Occupation"
                name="guardian.fatherOccupation"
                type="text"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Father Contact No"
                name="guardian.fatherContactNo"
                type="text"
              />
            </Col>

            {/* Mother Name,Mother Occupation,Mother Contact No */}
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Mother Name"
                name="guardian.motherName"
                type="text"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Mother Occupation"
                name="guardian.motherOccupation"
                type="text"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Mother Contact No"
                name="guardian.motherContactNo"
                type="text"
              />
            </Col>

            {/* Local Guardian Information */}
            <Divider>Local Guardian Information</Divider>
            {/* Name,Occupation,Contact No */}
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput label="Name" name="localGuardian.name" type="text" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Occupation"
                name="localGuardian.occupation"
                type="text"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Contact No"
                name="localGuardian.contactNo"
                type="text"
              />
            </Col>
            {/* Address */}
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Address"
                name="localGuardian.address"
                type="text"
              />
            </Col>

            {/* Admission Semester,Academic Department */}
            <Divider>Academic Information</Divider>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Admission Semester"
                name="admissionSemester"
                type="text"
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput
                label="Academic Department"
                name="academicDepartment"
                type="text"
              />
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
