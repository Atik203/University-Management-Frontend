import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicDepartment = () => {
  const { data, isFetching, isLoading } =
    useGetAllAcademicDepartmentsQuery(undefined);

  const academicDepartments = data?.data;

  if (isLoading || isFetching) {
    return <h4>Loading...</h4>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "2rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {academicDepartments?.map((department, index) => (
        <div key={department._id}>
          <h3>
            {index + 1} {department.name}
          </h3>
          <p>{department.academicFaculty.name}</p>
        </div>
      ))}
    </div>
  );
};

export default AcademicDepartment;
