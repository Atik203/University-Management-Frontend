import type { TableColumnsType, TableProps } from "antd";
import { Button, Flex, Modal, Pagination, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TQueryParam, TStudent } from "../../../types";

type TTableData = Pick<
  TStudent,
  | "name"
  | "id"
  | "fullName"
  | "academicDepartment"
  | "admissionSemester"
  | "academicFaculty"
> & {
  key: string;
  email: string;
  department: string;
  faculty: string;
  semester: string;
};

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: semesterData,
    isFetching,
    isLoading,
  } = useGetAllStudentsQuery([
    ...params,
    { name: "limit", value: "2" },
    { name: "page", value: page.toString() },
    { name: "sort", value: "id" },
  ]);

  const meta = semesterData?.meta;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // @ts-expect-error - data is possibly undefined
  const tableData: TTableData[] | undefined = semesterData?.data?.map(
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
      render: (item) => {
        return (
          <Flex justify="center" align="center" gap={6}>
            <Link to={item?.key}>
              {" "}
              <Button type="primary">Details</Button>{" "}
            </Link>
            <Link to={`update/${item?.key}`}>
              <Button type="primary" style={{ backgroundColor: "green" }}>
                Edit
              </Button>
            </Link>
            <Button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={showModal}
            >
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
    <>
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
        pagination={false}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        align="center"
        pageSize={meta?.limit}
        total={meta?.total}
        current={page}
      />
      <Modal
        title="Block Student"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        loading={isFetching || isLoading}
        okText="Yes"
      >
        <h4>Are you sure you want to block this student?</h4>
      </Modal>
    </>
  );
};

export default StudentData;
