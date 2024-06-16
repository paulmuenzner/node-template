import { catchAsync } from '@utils';
import os from 'os';

/**
 * @class HealthController
 * @desc Responsible for handling API requests for the
 * /health route.
 **/

class HealthController {
  healthStatus = catchAsync(async (req, res, next) => {
    try {
      // Get the memory usage object
      const memoryUsageBytes = process.memoryUsage();

      // Convert each property to megabytes
      const memoryUsageMB = {
        rss: memoryUsageBytes.rss / (1024 * 1024),
        heapTotal: memoryUsageBytes.heapTotal / (1024 * 1024),
        heapUsed: memoryUsageBytes.heapUsed / (1024 * 1024),
        external: memoryUsageBytes.external / (1024 * 1024),
        arrayBuffers: memoryUsageBytes.arrayBuffers / (1024 * 1024),
      };

      const healthInfo = {
        status: 'App alive',
        uptime: process.uptime(),
        memoryUsageMB,
        loadAverage: os.loadavg(),
        freeMemoryMB: os.freemem() / (1024 * 1024),
        totalMemoryMB: os.totalmem() / (1024 * 1024),
        cores: os.cpus().length,
      };
      res.status(200).json(healthInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

export default HealthController;
