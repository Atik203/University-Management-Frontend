import { useParams } from "react-router-dom";

const AdminDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>This is AdminDetails component {id} </h1>
    </div>
  );
};

export default AdminDetails;
