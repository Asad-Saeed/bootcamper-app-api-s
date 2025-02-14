/**
 * Builds a MongoDB query object from request query parameters
 * @param {Object} reqQuery - The request query object
 * @param {Array} removeFields - Fields to exclude from filtering
 * @returns {Object} Query object and other query options
 */
export const buildQuery = (
  reqQuery,
  removeFields = ["select", "sort", "page", "limit"]
) => {
  // Copy query params
  const queryParams = { ...reqQuery };

  // Remove fields that shouldn't be included in filtering
  removeFields.forEach((param) => delete queryParams[param]);

  // Create operators ($gt, $gte, etc)
  let queryStr = JSON.stringify(queryParams);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Parse the query string
  let query = JSON.parse(queryStr);

  // Handle select fields
  let select = "";
  if (reqQuery.select) {
    select = reqQuery.select.split(",").join(" ");
  }

  // Handle sort
  let sort = "-createdAt"; // default sort
  if (reqQuery.sort) {
    sort = reqQuery.sort.split(",").join(" ");
  }

  // Handle pagination
  const page = parseInt(reqQuery.page, 10) || 1;
  const limit = parseInt(reqQuery.limit, 10) || 100;
  const startIndex = (page - 1) * limit;

  return {
    query,
    select,
    sort,
    pagination: {
      page,
      limit,
      startIndex,
    },
  };
};
