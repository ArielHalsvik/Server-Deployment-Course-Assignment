function validateData(
  participantsData,
  email,
  firstName,
  lastName,
  dob,
  companyName,
  salary,
  currency,
  country,
  city,
  checkExistingEmail = true
) {
  let emptyFields = [];

  if (checkExistingEmail) {
    const existingParticipant = participantsData.find(
      (participant) => participant.participant.email === email
    );
    if (existingParticipant) {
      throw new Error("Participant with this email already exists.");
    }
  }

  if (!email) {
    emptyFields.push("email");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please use the correct email format.");
  }

  if (!firstName) {
    emptyFields.push("firstName");
  } else if (!/^[a-zA-Z\s-]+$/.test(firstName)) {
    throw new Error("Please only use letters for the firstName.");
  }

  if (!lastName) {
    emptyFields.push("lastName");
  } else if (!/^[a-zA-Z\s-]+$/.test(lastName)) {
    throw new Error("Please only use letters for the lastName.");
  }

  if (!dob) {
    emptyFields.push("dob");
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    throw new Error("Please use the format YYYY-MM-DD for the dob.");
  }

  if (!companyName) {
    emptyFields.push("companyName");
  } else if (!/^[a-zA-Z\s]+$/.test(companyName)) {
    throw new Error("Please only use letters for the companyName.");
  }

  if (!salary) {
    emptyFields.push("salary");
  } else if (isNaN(salary)) {
    throw new Error("Please only use numbers for the salary.");
  }

  if (!currency) {
    emptyFields.push("currency");
  } else if (!/^[a-zA-Z]+$/.test(currency)) {
    throw new Error("Please only use letters for the currency.");
  }

  if (!country) {
    emptyFields.push("country");
  } else if (!/^[a-zA-Z\s]+$/.test(country)) {
    throw new Error("Please only use letters for the country.");
  }

  if (!city) {
    emptyFields.push("city");
  } else if (!/^[a-zA-Z\s]+$/.test(city)) {
    throw new Error("Please only use letters for the city.");
  }

  if (emptyFields.length > 0) {
    throw new Error(
      `The following fields are required: ${emptyFields.join(", ")}.`
    );
  }
}

module.exports = validateData;