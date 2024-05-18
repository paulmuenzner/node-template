import { Logger } from '../../config';
import { catchAsync } from '../../utils';
const logger = new Logger();

export const health = catchAsync(async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
