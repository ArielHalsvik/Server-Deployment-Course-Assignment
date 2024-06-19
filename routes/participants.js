var express = require("express");
var router = express.Router();
var jsend = require("jsend");
router.use(jsend.middleware);

const adminAccess = require("../middleware/adminAccess");
const validateData = require("../middleware/validateData");

let participantsData = [];

/* Adds new participant */
router.post("/add", adminAccess, (req, res) => {
  const {
    email,
    firstName,
    lastName,
    dob,
    companyName,
    salary,
    currency,
    country,
    city,
  } = req.body;

  try {
    validateData(
      participantsData,
      email,
      firstName,
      lastName,
      dob,
      companyName,
      salary,
      currency,
      country,
      city
    );
  } catch (error) {
    return res.jsend.fail({ message: error.message });
  }

  const participant = {
    participant: {
      email,
      firstName,
      lastName,
      dob,
    },
    work: {
      companyName,
      salary,
      currency,
    },
    home: {
      country,
      city,
    },
  };

  participantsData.push(participant);
  return res.jsend.success({
    message: "Participant added successfully.",
    participant,
  });
});

/* Get all data from all participants */
router.get("/", adminAccess, (req, res) => {
  return res.jsend.success(participantsData);
});

/* Get details of all participants */
router.get("/details", adminAccess, (req, res) => {
  const names = participantsData.map((participant) => {
    const { firstName, lastName } = participant.participant;
    return { firstName, lastName };
  });

  return res.jsend.success(names);
});

/* Get personal information on a specific participant */
router.get("/details/:email", adminAccess, (req, res) => {
  const email = req.params.email;

  const findParticipant = participantsData.find(
    (participant) => participant.participant.email === email
  );
  if (!findParticipant) {
    return res.jsend.fail({
      message: "Participant doesn't exist.",
    });
  }

  return res.jsend.success(findParticipant.participant);
});

/* Get work information on a specific participant */
router.get("/work/:email", adminAccess, (req, res) => {
  const email = req.params.email;

  const findParticipant = participantsData.find(
    (participant) => participant.participant.email === email
  );
  if (!findParticipant) {
    return res.jsend.fail({
      message: "Participant doesn't exist.",
    });
  }

  return res.jsend.success(findParticipant.work);
});

/* Get home information on a specific participant */
router.get("/home/:email", adminAccess, (req, res) => {
  const email = req.params.email;

  const findParticipant = participantsData.find(
    (participant) => participant.participant.email === email
  );
  if (!findParticipant) {
    return res.jsend.fail({
      message: "Participant doesn't exist.",
    });
  }

  return res.jsend.success(findParticipant.home);
});

/* Delete a specific participant */
router.delete("/:email", adminAccess, (req, res) => {
  const email = req.params.email;

  const findParticipant = participantsData.findIndex(
    (participant) => participant.participant.email === email
  );
  if (findParticipant === -1) {
    return res.jsend.fail({
      message: "Participant doesn't exist.",
    });
  }

  participantsData.splice(findParticipant, 1);

  return res.jsend.success({
    message: "Participant deleted successfully.",
  });
});

/* Change a participant's information */
router.put("/:email", adminAccess, (req, res) => {
  const {
    email,
    firstName,
    lastName,
    dob,
    companyName,
    salary,
    currency,
    country,
    city,
  } = req.body;

  const findParticipant = participantsData.findIndex(
    (participant) => participant.participant.email === req.params.email
  );
  if (findParticipant === -1) {
    return res.jsend.fail({
      message: "Participant doesn't exist.",
    });
  }

  if (req.params.email !== email) {
    const emailExists = participantsData.find(participant => participant.participant.email === email);
    if (emailExists) {
      return res.jsend.fail({
        message: "Participant with this email already exists.",
      });
    }
  }

  try {
    validateData(
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
      false
    );
  } catch (error) {
    return res.jsend.fail({ message: error.message });
  }

  participantsData[findParticipant] = {
    participant: {
      email,
      firstName,
      lastName,
      dob,
    },
    work: {
      companyName,
      salary,
      currency,
    },
    home: {
      country,
      city,
    },
  };

  return res.jsend.success({
    message: "Participant updated successfully.",
    participant: participantsData[findParticipant],
  });
});

module.exports = router;