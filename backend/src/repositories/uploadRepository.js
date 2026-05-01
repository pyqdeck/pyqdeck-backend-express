import { Upload } from '../models/Upload.js';
import { NotFoundError } from '../utils/errors/index.js';
import { paginate } from '../utils/pagination/index.js';

class UploadRepository {
  async create(data) {
    const upload = new Upload(data);
    await upload.save();
    return upload;
  }

  async findById(id) {
    const upload = await Upload.findById(id);
    if (!upload) throw new NotFoundError('Upload not found');
    return upload;
  }

  async findByPublicId(publicId) {
    const upload = await Upload.findOne({ publicId });
    if (!upload) throw new NotFoundError('Upload not found');
    return upload;
  }

  async findByUploader(uploadedBy, pagination) {
    return paginate(Upload, { uploadedBy }, pagination);
  }

  async delete(id) {
    const upload = await Upload.findByIdAndDelete(id);
    if (!upload) throw new NotFoundError('Upload not found');
    return upload;
  }
}

export const uploadRepository = new UploadRepository();
export default uploadRepository;
