import moment from "moment";
import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../../types";

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isFetching, isLoading } = useGetSingleStudentQuery(
    id as string
  );

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  const student = data?.data as TStudent;

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "500px",
        margin: "auto",
        fontSize: "1.2rem",
      }}
    >
      <h1>Student Details</h1>
      <p>
        <strong>ID:</strong> {student.id}
      </p>
      <p>
        <strong>Name:</strong> {student.fullName}
      </p>
      <p>
        <strong>Email:</strong> {student.email}
      </p>
      <p>
        <strong>Contact No:</strong> {student.contactNo}
      </p>
      <p>
        <strong>Emergency Contact No:</strong> {student.emergencyContactNo}
      </p>
      <p>
        <strong>Gender:</strong> {student.gender}
      </p>
      <p>
        <strong>Date of Birth:</strong>{" "}
        {moment(student.dateOfBirth).format("YYYY-MM-DD")}
      </p>
      <p>
        <strong>Present Address:</strong> {student.presentAddress}
      </p>
      <p>
        <strong>Permanent Address:</strong> {student.permanentAddress}
      </p>
      <p>
        <strong>Guardian:</strong> {student.guardian.fatherName} /{" "}
        {student.guardian.motherName}
      </p>
      <p>
        <strong>Local Guardian:</strong> {student.localGuardian.name}
      </p>
      <p>
        <strong>Admission Semester:</strong> {student.admissionSemester.name}{" "}
        {student.admissionSemester.year}
      </p>
      <p>
        <strong>Academic Department:</strong> {student.academicDepartment.name}
      </p>
      <p>
        <strong>Academic Faculty:</strong> {student.academicFaculty.name}
      </p>
    </div>
  );
};

export default StudentDetails;
