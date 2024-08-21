import { Button, Dropdown, Table, TableColumnsType, TableProps } from "antd";
import { MenuClickEventHandler, MenuInfo } from "rc-menu/lib/interface";
import { useState } from "react";
import { toast } from "sonner";
import { monthOptions } from "../../../constants/global";
import {
  useGetAllCoursesQuery,
  useUpdateSemesterRegistrationMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { TQueryParam, TSemesterRegistration } from "../../../types";
import { TPreRequisiteCourse } from "../../../types/courseManagement.types";
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

const Courses = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [semesterId, setSemesterId] = useState("");

  const {
    data: courseData,
    isFetching,
    isLoading,
  } = useGetAllCoursesQuery(params);
  const [ChangeStatus] = useUpdateSemesterRegistrationMutation();

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

  const handleStatusChange = async (data: MenuInfo) => {
    const toastId = toast.loading("Changing Status...");

    const submitData = {
      id: semesterId,
      body: {
        status: data.key,
      },
    };

    try {
      const result = await ChangeStatus(submitData).unwrap();
      if (result.success) {
        toast.success(result.message, { id: toastId });
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong...", { id: toastId });
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusChange as MenuClickEventHandler,
  };

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
          return preRequisiteCourses.map((item: TPreRequisiteCourse, index) => {
            return (
              <h5>
                {index + 1}. {item.course.prefix + item.course.code}
              </h5>
            );
          });
        }
      },
    },

    {
      title: "Action",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button
              style={{ backgroundColor: "blue", color: "white" }}
              onClick={() => {
                setSemesterId(item.key);
              }}
            >
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
      dataSource={tableData as []}
      onChange={onChange}
      loading={isFetching || isLoading}
    />
  );
};

export default Courses;
