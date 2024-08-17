import type { TableColumnsType, TableProps } from "antd";
import { Button, Flex, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { monthOptions } from "../../../constants/global";
import { useGetAllSemesterRegistrationsQuery } from "../../../redux/features/admin/courseManagement.api";
import { TQueryParam, TSemesterRegistration } from "../../../types";

const MonthFilterOptions: { text: string; value: string }[] = [];

for (let i = 1; i <= 12; i++) {
  MonthFilterOptions.push({
    text: monthOptions[i - 1].value,
    value: monthOptions[i - 1].value,
  });
}

type TTableData = Pick<
  TSemesterRegistration,
  | "academicSemester"
  | "status"
  | "startDate"
  | "endDate"
  | "minCredit"
  | "maxCredit"
>;

const RegisteredCourse = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: semesterRegistrationData,
    isFetching,
    isLoading,
  } = useGetAllSemesterRegistrationsQuery(params);

  const tableData = semesterRegistrationData?.data?.map(
    ({
      _id,
      academicSemester,
      startDate,
      endDate,
      status,
      minCredit,
      maxCredit,
    }) => ({
      key: _id,
      academicSemester: academicSemester.name + " " + academicSemester.year,
      status,
      startDate: moment(startDate).format("DD/MM/YYYY"),
      endDate: moment(endDate).format("DD/MM/YYYY"),
      minCredit,
      maxCredit,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Semester",
      dataIndex: "academicSemester",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Min Credit",
      dataIndex: "minCredit",
    },
    {
      title: "Max Credit",
      dataIndex: "maxCredit",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "UPCOMING",
          value: "UPCOMING",
        },
        {
          text: "ONGOING",
          value: "ONGOING",
        },
        {
          text: "ENDED",
          value: "ENDED",
        },
      ],
    },
    {
      title: "Action",
      render: () => {
        return (
          <Flex justify="start" align="center" gap={5}>
            <Button type="primary">Edit</Button>
            <Button style={{ backgroundColor: "red", color: "white" }}>
              Delete
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
      dataSource={tableData}
      onChange={onChange}
      loading={isFetching || isLoading}
    />
  );
};

export default RegisteredCourse;
