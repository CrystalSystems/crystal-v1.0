import multer from "multer";
import fs from "fs";
import { randomUUID } from "node:crypto";

// directory mapping based on route parameters
const directoryMap = {
  userId: "uploads/users/images",
  postId: "uploads/posts/images",
};
// /directory mapping based on route parameters

// setting up file storage
const storage = multer.diskStorage({
  destination: (req, _, cb) => {

    // Determine the destination folder using the route parameters
    const paramKey = Object.keys(req.params).find((key) => directoryMap[key]);

    if (!paramKey || !directoryMap[paramKey]) {
      return cb(new Error("Invalid upload route."), null);
    }

    const directory = directoryMap[paramKey];
    // /Determine the destination folder using the route parameters

    try {

      // Create a folder if it doesn't exist
      fs.mkdirSync(directory, { recursive: true });
      cb(null, directory);
      // /Create a folder if it doesn't exist

    } catch (err) {
      cb(err, null);
    }
  },

  filename: (req, file, cb) => {
    const { userId, postId } = req.params;
    const id = userId || postId;

    if (!id) {
      return cb(new Error("Missing ID parameter for filename generation."), null);
    }

    const uniqueName = `${id}-${randomUUID()}.webp`;
    cb(null, uniqueName);
  }
});
// /setting up file storage

// filters and limits
export const upload = multer({
  storage,
  limits: {
    files: 1,
    fileSize: 314573, // 300 KB
    // fileSize: 524288,  // 512 KB
    // fileSize: 1048576, // 1 MB
  },
  fileFilter: (_, file, cb) => {
    const isImageExtension = /\.(jpe?g|png|gif|webp)$/i.test(file.originalname);
    const isImageMime = /^image\/(jpeg|png|gif|webp)$/.test(file.mimetype);
    const isValid = isImageExtension && isImageMime;
    cb(isValid ? null : new Error("Only image files are allowed."), isValid);
  }
});
//  /filters and limits

// error handler
export const errors = (err, req, res, next) => {
  if (err instanceof multer.MulterError || /.*(Invalid upload|Only image|Missing ID).*/.test(err?.message)) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};
// /error handler
