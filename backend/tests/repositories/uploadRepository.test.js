import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { uploadRepository } from '../../src/repositories/uploadRepository.js';
import { Upload } from '../../src/models/Upload.js';
import { NotFoundError } from '../../src/utils/errors/index.js';

describe('UploadRepository', () => {
  const uploadedBy = new mongoose.Types.ObjectId();
  const uploadData = {
    url: 'https://example.com/file.pdf',
    publicId: 'file_123',
    mimeType: 'application/pdf',
    size: 1024,
    uploadedBy,
  };

  beforeEach(async () => {
    await Upload.deleteMany({});
  });

  describe('create', () => {
    it('should create successfully', async () => {
      const upload = await uploadRepository.create(uploadData);
      expect(upload.url).toBe(uploadData.url);
      expect(upload.uploadedBy.toString()).toBe(uploadedBy.toString());
    });
  });

  describe('findById', () => {
    it('should find by id', async () => {
      const created = await uploadRepository.create(uploadData);
      const upload = await uploadRepository.findById(created.id);
      expect(upload.id).toBe(created.id);
    });
  });

  describe('findByPublicId', () => {
    it('should find by publicId', async () => {
      await uploadRepository.create(uploadData);
      const upload = await uploadRepository.findByPublicId(uploadData.publicId);
      expect(upload.publicId).toBe(uploadData.publicId);
    });
  });

  describe('findByUploader', () => {
    it('should return paginated uploads for uploader', async () => {
      await uploadRepository.create(uploadData);
      const result = await uploadRepository.findByUploader(uploadedBy, {
        page: 1,
        limit: 10,
      });
      expect(result.items).toHaveLength(1);
    });
  });

  describe('delete', () => {
    it('should delete successfully', async () => {
      const created = await uploadRepository.create(uploadData);
      await uploadRepository.delete(created.id);
      await expect(uploadRepository.findById(created.id)).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
