/**
 * Collection of query building utilities for MongoDB
 */

/**
 * Builds search query for all field types
 * @param {string} searchTerm
 * @param {Model} model
 */
export const buildSearchQuery = (searchTerm, model) => {
  if (!searchTerm) return {};

  const searchableFields = [];
  const excludedPaths = ["location.coordinates", "__v", "_id"]; // Add paths to exclude

  // Helper to check if path should be excluded
  const shouldExcludePath = (path) => {
    return excludedPaths.some((excludedPath) => path.startsWith(excludedPath));
  };

  Object.keys(model.schema.paths).forEach((path) => {
    // Skip excluded paths
    if (shouldExcludePath(path)) return;

    const fieldType = model.schema.paths[path].instance;

    switch (fieldType) {
      case "String":
        searchableFields.push({
          [path]: { $regex: searchTerm, $options: "i" },
        });
        break;

      case "Number":
        if (!isNaN(searchTerm)) {
          searchableFields.push({
            [path]: parseFloat(searchTerm),
          });
        }
        break;

      case "Boolean":
        if (["true", "false"].includes(searchTerm.toLowerCase())) {
          searchableFields.push({
            [path]: searchTerm.toLowerCase() === "true",
          });
        }
        break;

      case "Array":
        searchableFields.push({
          [path]: { $in: [new RegExp(searchTerm, "i")] },
        });
        break;

      case "Object":
        // Handle nested objects, but skip location.coordinates
        const nestedPaths = Object.keys(
          model.schema.paths[path].options.type || {}
        );
        nestedPaths.forEach((subPath) => {
          const fullPath = `${path}.${subPath}`;
          if (!shouldExcludePath(fullPath)) {
            searchableFields.push({
              [fullPath]: { $regex: searchTerm, $options: "i" },
            });
          }
        });
        break;
    }
  });

  return searchableFields.length > 0 ? { $or: searchableFields } : {};
};

/**
 * Processes MongoDB operators in query
 * @param {Object} queryParams
 */
export const buildOperatorQuery = (queryParams) => {
  const queryStr = JSON.stringify(queryParams);
  return JSON.parse(
    queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)
  );
};

/**
 * Applies field selection to query
 * @param {Object} query
 * @param {string} selectString
 */
export const buildSelectQuery = (query, selectString) => {
  if (!selectString) return query;
  const fields = selectString.split(",").join(" ");
  return query.select(fields);
};

/**
 * Applies sorting to query
 * @param {Object} query
 * @param {string} sortString
 */
export const buildSortQuery = (query, sortString) => {
  const sortBy = sortString ? sortString.split(",").join(" ") : "-createdAt";
  return query.sort(sortBy);
};

/**
 * Calculates pagination details
 * @param {number} total
 * @param {Object} options
 */
export const getPaginationData = (total, { page = 1, limit = 10 }) => {
  const currentPage = Math.max(1, parseInt(page, 10));
  const limitPerPage = Math.min(100, parseInt(limit, 10));
  const totalPages = Math.ceil(total / limitPerPage);

  return {
    page: currentPage,
    limit: limitPerPage,
    skip: (currentPage - 1) * limitPerPage,
    total,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

/**
 * Main query builder that combines all features
 * @param {Model} model
 * @param {Object} reqQuery
 */
export const filterBuilder = async (model, reqQuery) => {
  try {
    // Extract query parameters
    const { select, sort, page, limit, search, ...filters } = reqQuery;

    // Process filters and search
    let queryFilters = buildOperatorQuery(filters);
    const searchQuery = buildSearchQuery(search, model);
    queryFilters = {
      ...queryFilters,
      ...(Object.keys(searchQuery).length > 0 && searchQuery),
    };

    // Build query
    let query = model.find(queryFilters);
    query = buildSelectQuery(query, select);
    query = buildSortQuery(query, sort);

    // Handle pagination
    const total = await model.countDocuments(queryFilters);
    const pagination = getPaginationData(total, { page, limit });
    query = query.skip(pagination.skip).limit(pagination.limit);

    return { query, pagination };
  } catch (error) {
    throw new Error(`Query building failed: ${error.message}`);
  }
};
