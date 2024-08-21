import { Button, Modal, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import OpenForm from "../../../components/form/OpenForm";
import OpenSelect from "../../../components/form/OpenSelect";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { TFaculty, TQueryParam } from "../../../types";
import {
  TCourse,
  TPreRequisiteCourse,
} from "../../../types/courseManagement.types";

type TTableData = Pick<
  TCourse,
  "title" | "code" | "credits" | "preRequisiteCourses" | "prefix"
> & { key: string };

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
      title: "Faculties",
      dataIndex: "key",
      render: (courseId) => <CourseFaculties courseId={courseId} />,
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

const AddFacultyModal = ({ data }: { data: TTableData }) => {
  const id = data.key;

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

  const [AssignFaculties] = useAssignFacultiesMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Assigning faculties to course...");

    try {
      const submitData = {
        id,
        body: {
          faculties: data.faculties,
        },
      };
      const result = await AssignFaculties(submitData).unwrap();
      if (result.success) {
        toast.success("Faculties assigned successfully", { id: toastId });
        handleOk();
      } else {
        toast.error("Failed to assign faculties", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong...", { id: toastId });
    }
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
        footer={null}
      >
        <OpenForm onSubmit={handleSubmit}>
          <OpenSelect
            name="faculties"
            label="Faculty"
            options={facultiesOptions}
            mode="multiple"
          />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </OpenForm>
      </Modal>
    </>
  );
};

const CourseFaculties = ({ courseId }: { courseId: string }) => {
  const { data, isFetching, isLoading } = useGetCourseFacultiesQuery(courseId);

  const facultiesData = data?.data?.faculties;

  if (isFetching || isLoading) {
    return <p>Loading...</p>;
  }

  if (data?.data) {
    return facultiesData?.map((faculty: TFaculty, index: number) => (
      <p key={faculty._id}>
        {index + 1}. {faculty.fullName}
      </p>
    ));
  } else {
    return <p>Not Available</p>;
  }
};

export default Courses;
