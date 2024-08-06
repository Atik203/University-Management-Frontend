import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicFaculty = () => {
  const { data, isFetching, isLoading } =
    useGetAllAcademicFacultiesQuery(undefined);

  if (isLoading || isFetching) {
    return <h4>Loading...</h4>;
  }
  const academicFaculties = data?.data;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <h1>Academic Faculties</h1>
      {academicFaculties?.map((faculty, index) => (
        <div key={faculty._id}>
          <h2>
            {index + 1}. {faculty.name}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default AcademicFaculty;
