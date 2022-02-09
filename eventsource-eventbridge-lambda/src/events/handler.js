exports.createEvent = async (event, context) => {
  console.log(`Handler::createEvent\n${JSON.stringify(event, null, 2)}`);
  return formatResponse({ event });
};

exports.processEvent = async (event, context) => {
  console.log(`Handler::processEvent\n${JSON.stringify(event, null, 2)}`);
  return formatResponse({ event });
};

const formatResponse = (response, statusCode = 200) => {
  const body = response ? JSON.stringify(response) : undefined;
  return {
    statusCode,
    body,
  };
};
