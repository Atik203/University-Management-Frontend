import { Button, Col, Flex } from "antd";
import moment from "moment";
import { useState } from "react";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";
import OpenInput from "../../../components/form/OpenInput";
import OpenSelect from "../../../components/form/OpenSelect";
import OpenSelectWithWatch from "../../../components/form/OpenSelectWithWatch";
import { daysOptions } from "../../../constants/global";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllSemesterRegistrationsQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import OpenForm from "./../../../components/form/OpenForm";

const CreateOfferedCourse = () => {
  const [id, setId] = useState("");
  const [CreateOfferedCourse] = useCreateOfferedCourseMutation();

  const {
    data: semesterRegistrationData,
    isFetching,
    isLoading,
  } = useGetAllSemesterRegistrationsQuery(undefined);

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (semesterRegistration) => ({
      label:
        semesterRegistration.academicSemester.name +
        " " +
        semesterRegistration.academicSemester.year,
      value: semesterRegistration._id,
    })
  );

  const { data: departmentData } = useGetAllAcademicDepartmentsQuery(
    undefined,
    {
      skip: semesterRegistrationData?.data?.length === 0,
    }
  );

  const departmentOptions = departmentData?.data?.map((department) => ({
    label: department.name,
    value: department._id,
  }));

  const { data: courseData } = useGetAllCoursesQuery(undefined, {
    skip: semesterRegistrationData?.data?.length === 0,
  });

  const courseOptions = courseData?.data?.map((course) => ({
    label: course.title + " " + course.prefix + course.code,
    value: course._id,
  }));

  const { data: academicFacultyData } = useGetAllAcademicFacultiesQuery(
    undefined,
    {
      skip: semesterRegistrationData?.data?.length === 0,
    }
  );

  const academicFacultyOptions = academicFacultyData?.data?.map(
    (academicFaculty) => ({
      label: academicFaculty.name,
      value: academicFaculty._id,
    })
  );

  const { data: facultiesData } = useGetCourseFacultiesQuery(id, {
    skip: semesterRegistrationData?.data?.length === 0,
  });

  const facultiesOptions = facultiesData?.data?.faculties?.map((faculty) => ({
    label: faculty.fullName,
    value: faculty._id,
  }));

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating offered course...");

    const formatTime = (time: string | undefined) => {
      if (!time) return "00:00";
      return moment(time, "HH:mm").format("HH:mm");
    };

    try {
      const semesterData = {
        ...data,
        maxCapacity: Number(data.maxCapacity),
        section: Number(data.section),
        startTime: formatTime(data.startTime?.toString()),
        endTime: formatTime(data.endTime?.toString()),
      };
      const result = await CreateOfferedCourse(semesterData).unwrap();
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

  if (isFetching || isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Flex justify="center" align="center">
      <Col span={7}>
        <OpenForm onSubmit={onSubmit}>
          <OpenSelect
            label="Academic Department"
            name="academicDepartment"
            options={departmentOptions}
          />
          <OpenSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <OpenSelectWithWatch
            label="Course"
            name="course"
            onValueChange={setId}
            options={courseOptions}
          />
          <OpenSelect
            label="Semester Registration"
            name="semesterRegistration"
            options={semesterRegistrationOptions}
          />
          <OpenSelect
            label="Faculty"
            name="faculty"
            options={facultiesOptions}
            disabled={!id}
          />
          <OpenSelect
            label="Days"
            name="days"
            mode="multiple"
            options={daysOptions}
          />
          <OpenInput label="Max Capacity" name="maxCapacity" type="text" />
          <OpenInput label="Section" name="section" type="text" />
          <OpenInput label="Start Time" name="startTime" type="time" />
          <OpenInput label="End Time" name="endTime" type="time" />

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Flex>
  );
};

export default CreateOfferedCourse;
