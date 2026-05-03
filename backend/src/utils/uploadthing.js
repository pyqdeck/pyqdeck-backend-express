import { createUploadthing } from 'uploadthing/express';
import { Upload } from '../models/Upload.js';
import { User } from '../models/User.js';
import { loggerService } from './index.js';

const f = createUploadthing();
const logger = loggerService.getLogger();

/**
 * UploadThing File Router
 * Defines all upload "slots" and their rules
 */
export const uploadRouter = {
  // Define a route for PDF uploads
  pdfUploader: f({
    pdf: {
      maxFileSize: '16MB',
      maxFileCount: 1,
    },
  })
    // This runs on your server before the upload happens
    .middleware(async ({ req }) => {
      // Get user from Clerk auth (provided by clerkMiddleware in app.js)
      const user = req.auth;

      if (!user || !user.userId) {
        logger.error('Upload attempt by unauthorized user');
        throw new Error('Unauthorized');
      }

      // Whatever is returned here is passed to onUploadComplete as `metadata`
      return { clerkId: user.userId };
    })
    // This runs on your server AFTER the file is safely in UploadThing's storage
    .onUploadComplete(async ({ metadata, file }) => {
      logger.info('Upload complete', {
        clerkId: metadata.clerkId,
        fileUrl: file.url,
      });

      try {
        // Find the internal MongoDB user ID using the Clerk ID
        const dbUser = await User.findOne({ clerkId: metadata.clerkId });

        if (!dbUser) {
          logger.error('User not found in database during upload callback', {
            clerkId: metadata.clerkId,
          });
          return;
        }

        // Create the upload record in MongoDB
        const newUpload = await Upload.create({
          url: file.url,
          publicId: file.key,
          mimeType: 'application/pdf',
          size: file.size,
          uploadedBy: dbUser._id,
        });

        logger.info('Upload record saved to database', {
          uploadId: newUpload._id,
        });
      } catch (error) {
        logger.error('Error saving upload to database', {
          error: error.message,
          fileUrl: file.url,
        });
      }
    }),
};
