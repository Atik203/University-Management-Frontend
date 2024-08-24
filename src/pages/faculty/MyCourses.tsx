import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import OpenForm from "../../components/form/OpenForm";
import OpenSelect from "../../components/form/OpenSelect";
import { useGetFacultyEnrolledCoursesQuery } from "../../redux/features/faculty/facultyCourseManagement.api";

const MyCourses = () => {
  const navigate = useNavigate();
  const { data, isFetching, isLoading } =
    useGetFacultyEnrolledCoursesQuery(undefined);

  const myCourses = data?.data;

  if (myCourses?.length === 0) {
    return <div>No courses found</div>;
  }

  const semesterOptions = myCourses?.map((item) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = myCourses?.map((item) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Flex justify="center" align="center">
      <Col
        span={6}
        style={{
          textAlign: "center",
        }}
      >
        <OpenForm onSubmit={onSubmit}>
          <OpenSelect
            options={semesterOptions}
            name="semesterRegistration"
            label="Semester"
          />
          <OpenSelect options={courseOptions} name="course" label="Course" />
          <Button
            style={{
              backgroundColor: "#1890ff",
              color: "white",
            }}
            htmlType="submit"
          >
            Submit
          </Button>
        </OpenForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
