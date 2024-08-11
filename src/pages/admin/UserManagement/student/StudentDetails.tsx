import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../../types";

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isFetching, isLoading } = useGetSingleStudentQuery(id);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  const student = data?.data as TStudent;

  return (
    <div>
      <h1>This is StudentDetails component {id}</h1>
    </div>
  );
};

export default StudentDetails;
