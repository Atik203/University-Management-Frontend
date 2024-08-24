import { Table, Typography } from "antd";
import { useGetMyEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";
import { TEnrolledCourse } from "../../types/studentCourseManagement";

const { Title } = Typography;

const EnrolledCourses = () => {
  const { data, isFetching, isLoading } =
    useGetMyEnrolledCoursesQuery(undefined);

  if (isFetching || isLoading) {
    return <p>Loading...</p>;
  }

  const enrolledCourses = data?.data || [];

  const columns = [
    {
      title: "Course Title",
      dataIndex: "courseTitle",
      key: "courseTitle",
    },
    {
      title: "Prefix Code",
      dataIndex: "prefixCode",
      key: "prefixCode",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Faculty Name",
      dataIndex: "facultyName",
      key: "facultyName",
    },
  ];

  const dataSource = enrolledCourses.map((course: TEnrolledCourse) => ({
    key: course._id,
    courseTitle: course.course.title,
    prefixCode: `${course.course.prefix} ${course.course.code}`,
    section: course.offeredCourse.section,
    startTime: course.offeredCourse.startTime,
    endTime: course.offeredCourse.endTime,
    days: course.offeredCourse.days.join(", "),
    facultyName: `${course.faculty.fullName}`,
  }));

  return (
    <div>
      <Title level={2}>Enrolled Courses</Title>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default EnrolledCourses;
