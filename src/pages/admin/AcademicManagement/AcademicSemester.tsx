import type { TableColumnsType, TableProps } from "antd";
import { Button, Flex, Table } from "antd";
import { useState } from "react";
import { monthOptions } from "../../../constants/global";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TQueryParam } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.types";

const MonthFilterOptions: { text: string; value: string }[] = [];

for (let i = 1; i <= 12; i++) {
  MonthFilterOptions.push({
    text: monthOptions[i - 1].value,
    value: monthOptions[i - 1].value,
  });
}

type TTableData = Pick<
  TAcademicSemester,
  "name" | "startMonth" | "endMonth" | "year"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: semesterData,
    isFetching,
    isLoading,
  } = useGetAllSemestersQuery(params);

  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
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
      title: "Start Month",
      dataIndex: "startMonth",
      filters: MonthFilterOptions,
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      filters: MonthFilterOptions,
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
    {
      title: "Action",
      render: () => {
        return (
          <Flex justify="center" align="center" gap={5}>
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
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item as string });
      });

      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item as string });
      });

      filters.startMonth?.forEach((item) => {
        queryParams.push({ name: "startMonth", value: item as string });
      });

      filters.endMonth?.forEach((item) => {
        queryParams.push({ name: "endMonth", value: item as string });
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

export default AcademicSemester;
