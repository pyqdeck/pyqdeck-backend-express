import { parsePagination } from '../utils/pagination/index.js';

export function paginate() {
  return (req, res, next) => {
    try {
      req.pagination = parsePagination(req.query);
      next();
    } catch (error) {
      next(error);
    }
  };
}
