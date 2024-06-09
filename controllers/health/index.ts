import { Logger } from '../../config';
import { catchAsync } from '../../utils';
const logger = new Logger();

/**
 * @class HealthController
 * @desc Responsible for handling API requests for the
 * /health route.
 **/

class HealthController {
  healthStatus = catchAsync(async (req, res, next) => {
    try {
      res.sendStatus(200).json({ message: 'App alive' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

export default HealthController;
