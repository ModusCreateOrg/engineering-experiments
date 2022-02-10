exports.isBookAvailable = (bookId) => {
  const availableFactor = 0.75;
  return Math.random() < availableFactor;
};

exports.isBookAvailableAtBranch = (bookId, branchId) => {
  const availableAtBranchFactor = 0.5;
  return Math.random() < availableAtBranchFactor;
};
