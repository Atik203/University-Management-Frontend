import {
  Button,
  Dropdown,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import moment from "moment";
import { MenuClickEventHandler, MenuInfo } from "rc-menu/lib/interface";
import { useState } from "react";
import { monthOptions } from "../../../constants/global";
import { useGetAllSemesterRegistrationsQuery } from "../../../redux/features/admin/courseManagement.api";
import { TQueryParam, TSemesterRegistration } from "../../../types";
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

  const handleStatusChange = (key: MenuInfo) => {
    console.log(key);
  };

  const menuProps = {
    items,
    onClick: handleStatusChange as MenuClickEventHandler,
  };

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
      render: (status) => {
        let color;
        if (status === "ONGOING") {
          color = "green";
        }
        if (status === "UPCOMING") {
          color = "blue";
        }
        if (status === "ENDED") {
          color = "red";
        }

        return (
          <Tag style={{ fontSize: "1rem", fontWeight: "500" }} color={color}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      render: () => {
        return (
          <Dropdown menu={menuProps}>
            <Button style={{ backgroundColor: "blue", color: "white" }}>
              Change Status
            </Button>
          </Dropdown>
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
