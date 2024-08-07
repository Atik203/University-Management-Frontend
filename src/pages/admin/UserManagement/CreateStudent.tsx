import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Divider, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import OpenDatePicker from "../../../components/form/OpenDatePicker";
import OpenForm from "../../../components/form/OpenForm";
import OpenInput from "../../../components/form/OpenInput";
import OpenSelect from "../../../components/form/OpenSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { createStudentValidationSchema } from "../../../schemas/userManagement.schema";

const bloodGroupSelectOptions = bloodGroupOptions.map((bloodGroup) => ({
  value: bloodGroup,
  label: bloodGroup,
}));
const genderSelectOptions = genderOptions.map((gender) => ({
  value: gender,
  label: gender,
}));

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

  const {
    data: departmentData,
    isFetching: isDepartmentFetching,
    isLoading: isDepartmentLoading,
  } = useGetAllAcademicDepartmentsQuery(undefined);
  const {
    data: semesterData,
    isFetching: isSemesterFetching,
    isLoading: isSemesterLoading,
  } = useGetAllSemestersQuery(undefined);

  const academicDepartmentOptions = departmentData?.data?.map((department) => ({
    value: department._id,
    label: department.name,
  }));
  const academicSemesterOptions = semesterData?.data?.map((semester) => ({
    value: semester._id,
    label: semester.name + " " + semester.year,
  }));

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
            {/* Blood Group,DOB,Gender */}
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenSelect
                label="Blood Group"
                name="bloodGroup"
                options={bloodGroupSelectOptions}
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenDatePicker label="Date of Birth" name="dateOfBirth" />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenSelect
                label="Gender"
                name="gender"
                options={genderSelectOptions}
              />
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
              <OpenSelect
                label="Admission Semester"
                name="admissionSemester"
                options={academicSemesterOptions}
                disabled={isSemesterFetching || isSemesterLoading}
              />
            </Col>
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenSelect
                label="Academic Department"
                name="academicDepartment"
                options={academicDepartmentOptions}
                disabled={isDepartmentFetching || isDepartmentLoading}
              />
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{
              display: "flex",
              margin: "auto",
            }}
          >
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
