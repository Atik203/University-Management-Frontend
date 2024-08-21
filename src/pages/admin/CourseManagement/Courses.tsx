import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { monthOptions } from "../../../constants/global";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { TQueryParam } from "../../../types";
import {
  TCourse,
  TPreRequisiteCourse,
} from "../../../types/courseManagement.types";
const MonthFilterOptions: { text: string; value: string }[] = [];

const items = [
  {
    label: "UPCOMING",
    key: "UPCOMING",
  },
  {
    label: "ONGOING",
    key: "ONGOING",
  },
  {
    label: "ENDED",
    key: "ENDED",
  },
];

for (let i = 1; i <= 12; i++) {
  MonthFilterOptions.push({
    text: monthOptions[i - 1].value,
    value: monthOptions[i - 1].value,
  });
}

type TTableData = Pick<
  TCourse,
  "title" | "code" | "credits" | "preRequisiteCourses" | "prefix"
>;

const Courses = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: courseData,
    isFetching,
    isLoading,
  } = useGetAllCoursesQuery(params);

  const tableData = courseData?.data?.map(
    ({ _id, title, code, prefix, preRequisiteCourses, credits }) => ({
      key: _id,
      title,
      codePrefix: prefix + code,
      prefix,
      preRequisiteCourses,
      credits,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Course Title",
      dataIndex: "title",
    },
    {
      title: "Course Code",
      dataIndex: "codePrefix",
    },
    {
      title: "Course Credits",
      dataIndex: "credits",
    },
    {
      title: "Pre-Requisite Courses",
      dataIndex: "preRequisiteCourses",
      render: (preRequisiteCourses) => {
        if (preRequisiteCourses.length === 0) {
          return <p>None</p>;
        } else {
          return preRequisiteCourses.map(
            (item: TPreRequisiteCourse, index: number) => {
              return (
                <h5>
                  {index + 1}. {item.course.prefix + item.course.code}
                </h5>
              );
            }
          );
        }
      },
    },

    {
      title: "Action",
      render: () => {
        return (
          <Button style={{ backgroundColor: "blue", color: "white" }}>
            Change Status
          </Button>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.status?.forEach((item) => {
        queryParams.push({ name: "status", value: item as string });
      });

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

export default Courses;
