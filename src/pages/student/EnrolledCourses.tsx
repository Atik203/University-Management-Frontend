import { useGetMyEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const EnrolledCourses = () => {
  const { data, isFetching, isLoading } = useGetMyEnrolledCoursesQuery([]);

  const enrolledCourses = data?.data;
  console.log(enrolledCourses);
  if (isFetching || isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>This is EnrolledCourses component</h1>
    </div>
  );
};

export default EnrolledCourses;
