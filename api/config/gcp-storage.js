const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEYFILE, // Path to service account JSON
  // OR use credentials directly
  // credentials: {
  //   client_email: process.env.GCP_CLIENT_EMAIL,
  //   private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  // }
});

const bucket = storage.bucket(process.env.GCP_STORAGE_BUCKET);

// Multer configuration for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Helper function to upload file to GCS
const uploadToGCS = async (file, folder = 'avatars') => {
  try {
    const fileName = `${folder}/${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        cacheControl: 'public, max-age=31536000', // 1 year cache
      },
      public: true, // Make file publicly accessible
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', () => {
        // Get public URL
        const publicUrl = `https://storage.googleapis.com/${process.env.GCP_STORAGE_BUCKET}/${fileName}`;
        resolve({
          fileName,
          publicUrl,
          bucket: process.env.GCP_STORAGE_BUCKET
        });
      });

      stream.end(file.buffer);
    });
  } catch (error) {
    throw error;
  }
};

// Helper function to delete file from GCS
const deleteFromGCS = async (fileName) => {
  try {
    await bucket.file(fileName).delete();
    return true;
  } catch (error) {
    console.error('Error deleting file from GCS:', error);
    return false;
  }
};

// Helper function to get signed URL (for private files)
const getSignedUrl = async (fileName, expiresIn = '1h') => {
  try {
    const [url] = await bucket.file(fileName).getSignedUrl({
      action: 'read',
      expires: Date.now() + (parseInt(expiresIn) * 60 * 60 * 1000), // Convert hours to ms
    });
    return url;
  } catch (error) {
    throw error;
  }
};

// Helper function to check if file exists
const fileExists = async (fileName) => {
  try {
    const [exists] = await bucket.file(fileName).exists();
    return exists;
  } catch (error) {
    return false;
  }
};

module.exports = {
  storage,
  bucket,
  upload,
  uploadToGCS,
  deleteFromGCS,
  getSignedUrl,
  fileExists
};