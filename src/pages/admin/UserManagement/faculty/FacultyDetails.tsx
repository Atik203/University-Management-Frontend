import moment from "moment";
import { useParams } from "react-router-dom";
import { useGetSingleFacultyQuery } from "../../../../redux/features/admin/userManagement.api";
import { TFaculty } from "../../../../types";

const FacultyDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isFetching, isLoading } = useGetSingleFacultyQuery(
    id as string
  );

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  const faculty = data?.data as TFaculty;

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
      <h1>Faculty Details</h1>
      <p>
        <strong>ID:</strong> {faculty.id}
      </p>
      <p>
        <strong>Name:</strong> {faculty.fullName}
      </p>
      <p>
        <strong>Email:</strong> {faculty.email}
      </p>
      <p>
        <strong>Contact No:</strong> {faculty.contactNo}
      </p>
      <p>
        <strong>Emergency Contact No:</strong> {faculty.emergencyContactNo}
      </p>
      <p>
        <strong>Gender:</strong> {faculty.gender}
      </p>
      <p>
        <strong>Date of Birth:</strong>{" "}
        {moment(faculty.dateOfBirth).format("YYYY-MM-DD")}
      </p>
      <p>
        <strong>Present Address:</strong> {faculty.presentAddress}
      </p>
      <p>
        <strong>Permanent Address:</strong> {faculty.permanentAddress}
      </p>
      <p>
        <strong>Designation:</strong> {faculty.designation}
      </p>
      <p>
        <strong>Academic Department:</strong> {faculty.academicDepartment.name}
      </p>
      <p>
        <strong>Academic Faculty:</strong> {faculty.academicFaculty.name}
      </p>
    </div>
  );
};

export default FacultyDetails;
