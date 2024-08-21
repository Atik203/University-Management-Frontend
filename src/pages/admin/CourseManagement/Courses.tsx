import { Button, Modal, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import OpenForm from "../../../components/form/OpenForm";
import OpenSelect from "../../../components/form/OpenSelect";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { TQueryParam } from "../../../types";
import {
  TCourse,
  TPreRequisiteCourse,
} from "../../../types/courseManagement.types";

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
      render: (item) => {
        return <AddFacultyModal data={item} />;
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

const AddFacultyModal = ({ data }) => {
  console.log(data);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: facultyData,
    isFetching,
    isLoading,
  } = useGetAllFacultiesQuery(undefined);

  const faculties = facultyData?.data;

  const facultiesOptions = faculties?.map((faculty) => ({
    label: faculty.fullName,
    value: faculty._id,
  }));

  const [AssignFaculty] = useAssignFacultiesMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  if (isFetching || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Faculty
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <OpenForm onSubmit={handleSubmit}>
          <OpenSelect
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
          />
        </OpenForm>
      </Modal>
    </>
  );
};

export default Courses;
