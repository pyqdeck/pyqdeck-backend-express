import { platformConfigService } from '../services/platformConfigService.js';
import { ForbiddenError } from '../utils/errors/index.js';

export async function checkContentFreeze(req, res, next) {
  try {
    const frozen = await platformConfigService.isContentFrozen();
    if (frozen) {
      return next(
        new ForbiddenError(
          'Content is currently frozen by an administrator. No new content can be added.'
        )
      );
    }
    next();
  } catch (err) {
    next(err);
  }
}
