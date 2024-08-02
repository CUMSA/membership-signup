const valData = (data) => {
  let currMembershipCycle = new Date().getFullYear();
  const month = new Date().getMonth();
  if (month < 8) {
    currMembershipCycle -= 1;
  }

  // Check for required fields
  const required = [
    "FirstName",
    "LastName",
    "Gender",
    "DateofBirth",
    "Nationality",
    "SingaporeanPR",
    "Crsid",
    "AltEmail",
    "MatriculationYear",
    "GraduationYear",
    "College",
    "Course",
    "MembershipType",
    "UKMobile",
    "HomeMobile",
    "StudentType",
    "Scholarship",
  ];

  for (let i = 0; i < required.length; i++) {
    const x = required[i];
    if (!(x in data) || (x != "SingaporeanPR" && !data[x])) {
      return {
        success: false,
        data: `Missing required field: ${x}`,
      };
    }
  }

  // Check for DOB
  const dob = data["DateofBirth"];
  try {
    new Date(dob).toISOString();
  } catch (e) {
    return {
      success: false,
      data: `Invalid date of birth`,
    };
  }

  // Check Emails
  const personalEmail = data["AltEmail"];

  const personalVal = personalEmail
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (!personalVal) {
    return {
      success: false,
      data: `Ensure personal email is valid`,
    };
  }

  // Check phone numbers
  const UKNum = data["UKMobile"];
  const homeNum = data["HomeMobile"];
  const UKnumReg = /^\(?([0-9]{10})\)?$/;
  const homeNumReg = /^\+(?:[0-9]){1,4}\x20(?:[0-9]){6,14}$/;
  if (!UKnumReg.test(UKNum) || !homeNumReg.test(homeNum)) {
    return {
      success: false,
      data: `Ensure number provided is valid`,
    };
  }

  // Check CRSID
  const crsid = data["Crsid"];
  const crsidReg = /^[?:(a-z)]{1,5}[?:0-9]{1,4}$/;
  if (!crsidReg.test(crsid) || crsid.length > 7) {
    return {
      success: false,
      data: `Ensure Crsid provided is valid`,
    };
  }

  // Check colleges
  if (parseInt(data["College"]) < 1 || parseInt(data["College"]) > 32) {
    return {
      success: false,
      data: `Invalid college`,
    };
  }

  // Check matriculation
  if (data["MatriculationYear"] > new Date().getFullYear()) {
    return {
      success: false,
      data: `Matriculation Year cannot be in the future.`,
    };
  }

  if (
    data["MatriculationYear"] < 2000 ||
    data["GraduationYear"] > 2050 ||
    data["GraduationYear"] < data["MatriculationYear"]
  ) {
    return {
      success: false,
      data: `Ensure matriculation and graduation years are correct.`,
    };
  }

  // Validate membership type
  if (
    data["MembershipType"] != "Life" &&
    data["MembershipType"] !=
      `1 year (${currMembershipCycle}-${currMembershipCycle + 1})`
  ) {
    return {
      success: false,
      data: `Invalid membership type`,
    };
  }

  // Privacy
  if (!data.Privacy) {
    return {
      success: false,
      data: "Please consent to privacy statement",
    };
  }

  // Change types
  const editedData = data;
  editedData["College"] = parseInt(data["College"]);

  editedData["GraduationYear"] = data["GraduationYear"].toString();
  editedData["MatriculationYear"] = data["MatriculationYear"].toString();
  editedData["DateofBirth"] = new Date(data["DateofBirth"])
    .toISOString()
    .slice(0, 10);

  delete editedData["Privacy"];

  console.log(editedData);

  return {
    success: true,
    data: editedData,
  };
};

module.exports = { valData };
