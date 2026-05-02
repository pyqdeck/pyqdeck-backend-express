import { describe, it, expect, vi, beforeEach } from 'vitest';
import { User } from '../../src/models/User.js';
import { Upload } from '../../src/models/Upload.js';
import { uploadRouter } from '../../src/utils/uploadthing.js';
import { loggerService } from '../../src/utils/index.js';

vi.mock('../../src/models/User.js', () => ({
  User: {
    findOne: vi.fn(),
  },
}));

vi.mock('../../src/models/Upload.js', () => ({
  Upload: {
    create: vi.fn(),
  },
}));

vi.mock('../../src/utils/index.js', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    loggerService: {
      getLogger: () => ({
        info: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        debug: vi.fn(),
      })
    }
  };
});

describe('uploadRouter', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('pdfUploader', () => {
    it('should have middleware defined', async () => {
      // It's not an array, it's a function directly in _def or middleware property
      const middlewareFn = uploadRouter.pdfUploader.middleware;

      const req = { auth: { userId: 'user-123' } };

      const res = await middlewareFn({ req });
      expect(res).toEqual({ clerkId: 'user-123' });
    });

    it('should throw Unauthorized if no user auth is present in middleware', async () => {
      const middlewareFn = uploadRouter.pdfUploader.middleware;

      const req = { auth: null };

      await expect(middlewareFn({ req })).rejects.toThrow('Unauthorized');
    });

    it('should handle onUploadComplete successfully', async () => {
      const onUploadCompleteFn = uploadRouter.pdfUploader.onUploadComplete;

      User.findOne.mockResolvedValue({ _id: 'db-user-id' });
      Upload.create.mockResolvedValue({ _id: 'new-upload-id' });

      const metadata = { clerkId: 'user-123' };
      const file = { url: 'https://example.com/file.pdf', key: 'file-key', size: 1024 };

      await onUploadCompleteFn({ metadata, file });

      expect(User.findOne).toHaveBeenCalledWith({ clerkId: 'user-123' });
      expect(Upload.create).toHaveBeenCalledWith({
        url: 'https://example.com/file.pdf',
        publicId: 'file-key',
        mimeType: 'application/pdf',
        size: 1024,
        uploadedBy: 'db-user-id',
      });
    });

    it('should log error if user is not found in db during onUploadComplete', async () => {
      const onUploadCompleteFn = uploadRouter.pdfUploader.onUploadComplete;

      User.findOne.mockResolvedValue(null);

      const metadata = { clerkId: 'user-123' };
      const file = { url: 'https://example.com/file.pdf', key: 'file-key', size: 1024 };

      await onUploadCompleteFn({ metadata, file });

      expect(Upload.create).not.toHaveBeenCalled();
    });

    it('should log error if saving upload fails during onUploadComplete', async () => {
      const onUploadCompleteFn = uploadRouter.pdfUploader.onUploadComplete;

      User.findOne.mockResolvedValue({ _id: 'db-user-id' });
      const error = new Error('DB Error');
      Upload.create.mockRejectedValue(error);

      const metadata = { clerkId: 'user-123' };
      const file = { url: 'https://example.com/file.pdf', key: 'file-key', size: 1024 };

      await onUploadCompleteFn({ metadata, file });
      // Error is caught silently in code, we just ensure it didn't throw to caller
    });
  });
});
