export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = monthNames.map((month) => ({
  value: month,
  label: month,
}));

export const genderOptions = ["male", "female", "other"];

export const bloodGroupOptions = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];
export const bloodGroupSelectOptions = bloodGroupOptions.map((bloodGroup) => ({
  value: bloodGroup,
  label: bloodGroup,
}));
export const genderSelectOptions = genderOptions.map((gender) => ({
  value: gender,
  label: gender,
}));
