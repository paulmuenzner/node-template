import { catchAsync } from '../../utils';

export const getUser = catchAsync(async (req, res, next) => {
  try {
    const data: any = await {
      firstName: 'Jon',
      surName: 'Jon',
      email: 'jane.doe@example.com',
      _id: '4ecc05e55dd98a436ddcc47c',
      telephone: '+001123456789',
      country: 'US',
      createdAt: '1715774642227',
      updatedAt: '1715947438966',
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
