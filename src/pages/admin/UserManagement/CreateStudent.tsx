const CreateStudent = () => {
  const student = {
    password: "password123",
    student: {
      name: {
        firstName: "John",
        middleName: "Doe",
        lastName: "Smith",
      },
      gender: "male",
      dateOfBirth: "2000-01-01",
      email: "johndone2@gmail.com",
      contactNo: "1234567890",
      emergencyContactNo: "0987654321",
      bloodGroup: "A+",
      presentAddress: "123 Street, City, State, Country",
      permanentAddress: "456 Avenue, City, State, Country",
      guardian: {
        fatherName: "Robert Smith",
        fatherOccupation: "Engineer",
        fatherContactNo: "1234567890",
        motherName: "Jane Smith",
        motherOccupation: "Doctor",
        motherContactNo: "0987654321",
      },
      localGuardian: {
        name: "Alice Johnson",
        occupation: "Teacher",
        contactNo: "1234567890",
        address: "789 Street, City, State, Country",
      },
      admissionSemester: "6662d756fd67954d2f594983",
      academicDepartment: "6662e9bf5b7ca57ef3244733",
    },
  };

  return (
    <div>
      <h1>This is CreateStudent component</h1>
    </div>
  );
};

export default CreateStudent;
