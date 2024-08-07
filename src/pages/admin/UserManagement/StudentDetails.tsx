import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>This is StudentDetails component {id}</h1>
    </div>
  );
};

export default StudentDetails;
