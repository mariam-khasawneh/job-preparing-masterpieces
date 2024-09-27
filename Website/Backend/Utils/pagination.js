function paginate(model, page = 1, limit = 10) {
  // Ensure page and limit are numbers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const skip = (pageNumber - 1) * limitNumber; // Calculate number of documents to skip

  return model
    .find()
    .skip(skip)
    .limit(limitNumber)
    .then((data) => {
      return model.countDocuments().then((totalItems) => {
        const totalPages = Math.ceil(totalItems / limitNumber);

        return {
          totalItems,
          totalPages,
          currentPage: pageNumber,
          data,
        };
      });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
}

module.exports = paginate;
