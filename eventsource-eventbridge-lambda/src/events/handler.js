export const createEvent = async (event, context) => {
  console.log(`Handler::createEvent\n${JSON.stringify(event, null, 2)}`);
  return {
    statusCode: 200,
    event,
  };
};

export const processEvent = async (event, context) => {
  console.log(`Handler::processEvent\n${JSON.stringify(event, null, 2)}`);
  return {
    statusCode: 200,
    event,
  };
};
