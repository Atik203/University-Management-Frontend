export const nameOptions = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];

const currentYear = new Date().getFullYear();
export const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: (currentYear + number).toString(),
  label: (currentYear + number).toString(),
}));

export const statusOptions = ["UPCOMING", "ONGOING", "COMPLETED"].map(
  (status) => ({
    label: status,
    value: status,
  })
);
