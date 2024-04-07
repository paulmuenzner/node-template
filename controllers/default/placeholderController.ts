import { Logger } from '../../config';
import { catchAsync } from '../../utils';
const logger = new Logger();
export const placeholder = catchAsync(async (req, res, next) => {
  try {
    const data: any = await { test: 'test' };

    logger.warn('test msg', 'LoginController');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
