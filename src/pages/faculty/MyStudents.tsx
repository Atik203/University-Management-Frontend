import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import OpenForm from "../../components/form/OpenForm";
import OpenInput from "../../components/form/OpenInput";
import {
  useGetFacultyEnrolledCoursesQuery,
  useUpdateCourseMarksMutation,
} from "../../redux/features/faculty/facultyCourseManagement.api";
import { TCourseMarks } from "../../types";

interface TStudentInfo {
  key: string;
  name: string;
  roll: string;
  semesterRegistration: string;
  student: string;
  offeredCourse: string;
  department: string;
  courseMarks: TCourseMarks;
  grade: string;
  gradePoints: number;
}

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCoursesData } = useGetFacultyEnrolledCoursesQuery([
    { name: "semesterRegistration", value: registerSemesterId },
    { name: "course", value: courseId },
  ]);

  const tableData = facultyCoursesData?.data?.map(
    ({
      _id,
      student,
      semesterRegistration,
      offeredCourse,
      academicDepartment,
      courseMarks,
      grade,
      gradePoints,
    }) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
      department: academicDepartment.name,
      courseMarks,
      grade,
      gradePoints,
    })
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      key: "roll",
      dataIndex: "roll",
    },
    {
      title: "Department",
      key: "department",
      dataIndex: "department",
    },
    {
      title: "Marks",
      key: "courseMarks",
      render: (item: TStudentInfo) => {
        return (
          <ol>
            <li>Class Test 1: {item.courseMarks.classTest1}</li>
            <li>Class Test 2: {item.courseMarks.classTest2}</li>
            <li>Midterm: {item.courseMarks.midTerm}</li>
            <li>Final: {item.courseMarks.finalTerm}</li>
          </ol>
        );
      },
    },
    {
      title: "Grade",
      key: "grade",
      dataIndex: "grade",
    },
    {
      title: "CGPA",
      key: "gradePoints",
      dataIndex: "gradePoints",
    },
    {
      title: "Action",
      key: "x",
      render: (item: TStudentInfo) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return (
    <Table
      style={{
        fontSize: "1rem",
        fontWeight: "400",
      }}
      columns={columns}
      dataSource={tableData}
    />
  );
};

const AddMarksModal = ({ studentInfo }: { studentInfo: TStudentInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [UpdateCourseMarks] = useUpdateCourseMarksMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating marks...");
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1) || 0,
        midTerm: Number(data.midTerm) || 0,
        classTest2: Number(data.classTest2) || 0,
        finalTerm: Number(data.finalTerm) || 0,
      },
    };

    try {
      const result = await UpdateCourseMarks(studentMark).unwrap();
      if (result.success) {
        toast.success(result.message, { id: toastId });
        setIsModalOpen(false);
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        style={{
          backgroundColor: "black",
          color: "white",
        }}
        onClick={showModal}
        disabled={studentInfo.gradePoints > 0}
      >
        Add Marks
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <OpenForm onSubmit={handleSubmit}>
          <OpenInput type="text" name="classTest1" label="Class Test 1" />
          <OpenInput type="text" name="classTest2" label="Class Test 2" />
          <OpenInput type="text" name="midTerm" label="Midterm" />
          <OpenInput type="text" name="finalTerm" label="Final" />
          <Button
            style={{
              backgroundColor: "#1890ff",
              color: "white",
            }}
            htmlType="submit"
          >
            Submit
          </Button>
        </OpenForm>
      </Modal>
    </>
  );
};

export default MyStudents;
