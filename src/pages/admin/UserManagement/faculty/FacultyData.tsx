import type { TableColumnsType, TableProps } from "antd";
import { Button, Flex, Modal, Pagination, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  useChangeStatusMutation,
  useGetAllFacultiesQuery,
} from "../../../../redux/features/admin/userManagement.api";
import { TFaculty, TQueryParam } from "../../../../types";

type TTableData = Pick<
  TFaculty,
  | "name"
  | "id"
  | "fullName"
  | "academicDepartment"
  | "academicFaculty"
  | "designation"
> & {
  key: string;
  email: string;
  department: string;
  faculty: string;
  semester: string;
};

const FacultyData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const [ChangeStatus] = useChangeStatusMutation();

  const {
    data: facultyData,
    isFetching,
    isLoading,
  } = useGetAllFacultiesQuery([
    ...params,
    { name: "limit", value: "2" },
    { name: "page", value: page.toString() },
    { name: "sort", value: "id" },
  ]);

  const meta = facultyData?.meta;

  const showModal = (Id: string) => {
    setIsModalOpen(true);
    setId(Id);
  };

  const handleOk = async () => {
    const toastId = toast.loading(`${isBlock ? "Unblocking" : "Blocking"}...`);
    const status = isBlock ? "in-progress" : "blocked";
    try {
      const result = await ChangeStatus({ id, status }).unwrap();
      if (result.success) {
        toast.success(`${isBlock ? "Unblocked" : "Blocked"} Successfully`, {
          id: toastId,
        });
        setIsBlock(!isBlock);
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // @ts-expect-error - data is possibly undefined
  const tableData: TTableData[] | undefined = facultyData?.data?.map(
    ({
      _id,
      fullName,
      email,
      academicDepartment,
      id,
      academicFaculty,
      designation,
      user,
    }) => ({
      key: _id,
      fullName,
      email,
      department: academicDepartment.name,
      faculty: academicFaculty.name,
      id,
      designation,
      user,
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
      title: "Designation",
      dataIndex: "designation",
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
              onClick={() => showModal(item?.user._id)}
            >
              {item?.user.status}
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

export default FacultyData;
