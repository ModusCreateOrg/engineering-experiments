exports.handle = async (event, context) => {
  console.log(`Handler::sendNotification`);
  // console.log(`event\n${JSON.stringify(event, null, 2)}`);

  const { detail = {} } = event;
  const detailType = event['detail-type'];

  switch (detailType) {
    case 'Transfer Requested':
      console.log(
        `Hello ${detail.accountId}. We are transferring book ${detail.bookId} to branch ${detail.branchId} and will let you know when it is ready to be picked up.`
      );
      break;
    case 'Add to Wait List':
      console.log(
        `Hello ${detail.accountId}. All copies of ${detail.bookId} are currently checked out. We have added you to the wait list and will let you know when it is ready to be picked up.`
      );
      break;
    case 'Ready for Pickup':
      console.log(
        `Hello ${detail.accountId}. The book ${detail.bookId} is ready for you to pick up at branch ${detail.branchId}.`
      );
      break;
    default:
      throw new Error(`Unhandled detail type: ${detailType}. Event: ${JSON.stringify(event)}.`);
  }

  return {
    status: 200,
    statusText: 'OK',
  };
};
