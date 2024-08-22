import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAllOfferedCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { TOfferedCourse, TQueryParam } from "../../../types";

type TTableData = Pick<
  TOfferedCourse,
  | "academicSemester"
  | "academicDepartment"
  | "academicFaculty"
  | "course"
  | "maxCapacity"
>;

const OfferedCourses = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: offeredCoursesData,
    isFetching,
    isLoading,
  } = useGetAllOfferedCoursesQuery(params);

  const tableData = offeredCoursesData?.data?.map(
    ({
      _id,
      academicSemester,
      academicDepartment,
      academicFaculty,
      course,
      faculty,
      semesterRegistration,
      maxCapacity,
      section,
    }) => ({
      key: _id,
      academicDepartment: academicDepartment.name,
      academicFaculty: academicFaculty.name,
      course: course.prefix + course.code + " " + course.title,
      faculty: faculty.fullName,
      section,
      maxCapacity,
      semesterDetails:
        academicSemester?.name +
        " " +
        academicSemester?.year +
        " " +
        semesterRegistration?.status,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Department",
      dataIndex: "academicDepartment",
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
    },
    {
      title: "Course",
      dataIndex: "course",
    },
    {
      title: "Semester Details",
      dataIndex: "semesterDetails",
    },
    {
      title: "Max Capacity",
      dataIndex: "maxCapacity",
    },
    {
      title: "Section",
      dataIndex: "section",
    },
    {
      title: "Action",
      render: () => {
        return (
          <Button style={{ backgroundColor: "red", color: "white" }}>
            Delete
          </Button>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      setParams(queryParams);
    }
  };

  return (
    <Table
      style={{
        color: "black",
        fontWeight: "medium",
        fontSize: "1rem",
      }}
      columns={columns}
      dataSource={tableData as []}
      onChange={onChange}
      loading={isFetching || isLoading}
    />
  );
};

export default OfferedCourses;
