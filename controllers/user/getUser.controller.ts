import { catchAsync } from '../../utils';

export const getUser = catchAsync(async (req, res, next) => {
  try {
    const data: any = await { user: 'Jon Doe' };
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
