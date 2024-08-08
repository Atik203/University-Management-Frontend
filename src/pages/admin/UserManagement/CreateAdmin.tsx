import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import OpenDatePicker from "../../../components/form/OpenDatePicker";
import OpenForm from "../../../components/form/OpenForm";
import OpenInput from "../../../components/form/OpenInput";
import OpenSelect from "../../../components/form/OpenSelect";
import {
  bloodGroupSelectOptions,
  genderSelectOptions,
} from "../../../constants/global";
import { useCreateAdminMutation } from "../../../redux/features/admin/userManagement.api";

const CreateAdmin = () => {
  const admin = {
    name: {
      firstName: "Mr.",
      middleName: "",
      lastName: "Admin",
    },
    designation: "Head of Department",
    gender: "male",
    email: "hosansaddam@gmail.com",
    contactNo: "1234567890",
    emergencyContactNo: "0987654321",
    bloodGroup: "A+",
    presentAddress: "123 Street, City, State, Country",
    permanentAddress: "456 Avenue, City, State, Country",
  };

  const [CreateAdmin] = useCreateAdminMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Faculty...");
    const formData = new FormData();

    const submitData = {
      password: "password123",
      faculty: data,
    };
    formData.append("data", JSON.stringify(submitData));
    formData.append("file", data?.image);

    try {
      const result = await CreateAdmin(formData).unwrap();
      if (result?.success) {
        toast.success(result?.message, { id: toastId });
      } else {
        toast.error(result?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Row>
      <Col span={24}>
        <OpenForm defaultValues={admin} onSubmit={onSubmit}>
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
            </Col>{" "}
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <OpenInput label="Designation" name="designation" type="text" />
            </Col>
            {/* Image */}
            <Col span={24} lg={{ span: 8 }} md={{ span: 12 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Image">
                    {" "}
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
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

export default CreateAdmin;
