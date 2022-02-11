const { isBookAvailable, isBookAvailableAtBranch } = require('./utils/availability');
const { addToWaitList, readyForPickup, requestTransfer } = require('./utils/events');

exports.handle = async (event, context) => {
  console.log(`Handler::requestHold\n${JSON.stringify(event, null, 2)}`);

  const { detail = {} } = event;
  console.log(`Hold requested for book ${detail.bookId} at branch ${detail.branchId} by account ${detail.accountId}.`);

  if (isBookAvailable(detail.bookId)) {
    if (isBookAvailableAtBranch(detail.bookId, detail.branchId)) {
      console.log(`Book ${detail.bookId} has copies available at branch ${detail.branchId}. Ready for pick up.`);
      await readyForPickup(detail);
    } else {
      console.log(
        `Book ${detail.bookId} has copies available at other branches. Request transfer to branch ${detail.branchId}.`
      );
      await requestTransfer(detail);
    }
  } else {
    console.log(`Book ${detail.bookId} not currently available. Adding to wait list.`);
    await addToWaitList(detail);
  }

  return {
    status: 200,
    statusText: 'OK',
    data: {
      event,
    },
  };
};
