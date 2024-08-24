import { Button, Col, Row } from "antd";
import { useGetMyOfferedCoursesQuery } from "../../redux/features/admin/courseManagement.api";

type TModifiedOfferedCourse = {
  courseTitle: string;
  sections: {
    section: number;
    days: string[];
    startTime: string;
    endTime: string;
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
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
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

  return (
    <Row gutter={[0, 20]}>
      {modifiedOfferedCourses.map((item) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((section) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{
                      borderTop: "solid #d4d4d4 2px",
                      padding: "10px",
                      fontSize: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    <Col span={5}>Section: {section.section} </Col>
                    <Col span={5}>
                      days:{" "}
                      {section.days.map((day) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime} </Col>
                    <Col span={5}>End Time: {section.endTime} </Col>
                    <Button
                      style={{
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
