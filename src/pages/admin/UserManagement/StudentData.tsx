import type { TableColumnsType, TableProps } from "antd";
import { Button, Flex, Table } from "antd";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TQueryParam, TStudent } from "../../../types";

type TTableData = Pick<TStudent, "name" | "id">;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: semesterData,
    isFetching,
    isLoading,
  } = useGetAllStudentsQuery(params);

  const tableData = semesterData?.data?.map(
    ({
      _id,
      fullName,
      email,
      academicDepartment,
      id,
      academicFaculty,
      admissionSemester,
    }) => ({
      key: _id,
      fullName,
      email,
      department: academicDepartment.name,
      faculty: academicFaculty.name,
      semester: admissionSemester.name + " " + admissionSemester.year,
      id,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "ID No.",
      dataIndex: "id",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
    },
    {
      title: "Semester",
      dataIndex: "semester",
    },
    {
      title: "Action",
      render: () => {
        return (
          <Flex justify="center" align="center" gap={6}>
            <Button type="primary">Details</Button>
            <Button type="primary" style={{ backgroundColor: "green" }}>
              Edit
            </Button>
            <Button style={{ backgroundColor: "red", color: "white" }}>
              Block
            </Button>
          </Flex>
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
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item as string });
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
      dataSource={tableData}
      onChange={onChange}
      loading={isFetching || isLoading}
    />
  );
};

export default StudentData;
