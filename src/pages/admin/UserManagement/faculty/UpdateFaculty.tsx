import { useParams } from "react-router-dom";

const UpdateFaculty = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>This is UpdateFaculty component {id} </h1>
    </div>
  );
};

export default UpdateFaculty;
