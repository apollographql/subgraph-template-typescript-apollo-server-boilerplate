const getFields = (body, res) => {
  const {
    firstName,
    lastName,
    cardNumber,
    cardExpiryMonth,
    cardExpiryYear,
    amount,
    email,
    phoneNumber,
  } = body;
  const requiredFields = [
    "firstName",
    "lastName",
    "cardNumber",
    "cardExpiryMonth",
    "cardExpiryYear",
    "amount",
    "email",
    "phoneNumber",
  ];

  // Check for missing fields
  const missingFields = requiredFields.filter((field) => !body[field]);

  if (missingFields.length > 0) {
    const errorMessage = `Missing required fields: ${missingFields.join(", ")}`;
    console.error(errorMessage);
    return res.status(400).send({ error: errorMessage });
  }
  return {
    firstName,
    lastName,
    cardNumber,
    cardExpiryMonth,
    cardExpiryYear,
    amount,
    email,
    phoneNumber,
  };
};

module.exports = getFields;
