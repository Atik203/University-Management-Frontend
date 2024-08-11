import moment from "moment";
import { useParams } from "react-router-dom";
import { useGetSingleAdminQuery } from "../../../../redux/features/admin/userManagement.api";
import { TAdmin } from "../../../../types";

const AdminDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isFetching, isLoading } = useGetSingleAdminQuery(id);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  const admin = data?.data as TAdmin;

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
      <h1>Admin Details</h1>
      <p>
        <strong>ID:</strong> {admin.id}
      </p>
      <p>
        <strong>Name:</strong> {admin.fullName}
      </p>
      <p>
        <strong>Email:</strong> {admin.email}
      </p>
      <p>
        <strong>Contact No:</strong> {admin.contactNo}
      </p>
      <p>
        <strong>Emergency Contact No:</strong> {admin.emergencyContactNo}
      </p>
      <p>
        <strong>Gender:</strong> {admin.gender}
      </p>
      <p>
        <strong>Date of Birth:</strong>{" "}
        {moment(admin.dateOfBirth).format("YYYY-MM-DD")}
      </p>
      <p>
        <strong>Present Address:</strong> {admin.presentAddress}
      </p>
      <p>
        <strong>Permanent Address:</strong> {admin.permanentAddress}
      </p>
      <p>
        <strong>Designation:</strong> {admin.designation}
      </p>
    </div>
  );
};

export default AdminDetails;
