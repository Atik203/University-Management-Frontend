import { useParams } from "react-router-dom";

const FacultyDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>This is FacultyDetails component {id} </h1>
    </div>
  );
};

export default FacultyDetails;
