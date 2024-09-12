/**
 *
 * @param {string| Date} birthdate
 * @param {string | Date} [reference] - optional reference timestamp
 * @returns {number}
 */
export const calculateAge = (birthdate, reference = null) => {
  const today = reference || new Date();
  const birthDate = new Date(birthdate);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // if the birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};
