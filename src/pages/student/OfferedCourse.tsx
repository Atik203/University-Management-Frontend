import { useGetMyOfferedCoursesQuery } from "../../redux/features/admin/courseManagement.api";

type TModifiedOfferedCourse = {
  courseTitle: string;
  sections: {
    section: string;
    _id: string;
  }[];
};
type TOfferedCoursesAccumulator = {
  [key: string]: TModifiedOfferedCourse;
};
const OfferedCourse = () => {
  const { data, isFetching, isLoading } =
    useGetMyOfferedCoursesQuery(undefined);

  const offeredCourses =
    data?.data?.reduce<TOfferedCoursesAccumulator>((acc, item) => {
      const key = item.course.title;
      acc[key] = acc[key] || { courseTitle: item.course.title, sections: [] };
      acc[key].sections.push({
        section: item.section,
        _id: item._id,
      });
      return acc;
    }, {} as TOfferedCoursesAccumulator) || {};

  const modifiedOfferedCourses = Object.values(
    offeredCourses
  ) as TModifiedOfferedCourse[];

  if (isFetching || isLoading) {
    return <p>Loading...</p>;
  }
  console.log(modifiedOfferedCourses);

  return (
    <div>
      <h1>This is OfferedCourse component</h1>
    </div>
  );
};

export default OfferedCourse;
