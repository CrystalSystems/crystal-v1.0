import multer from "multer";
import fs from "fs";
import { nanoid } from 'nanoid';
const storage = multer.diskStorage({
  destination: (req, _, cb) => {
    // Get folder name and file type, to create directory name
    const fileType = req.query.fileType;
    // /Get folder name and file type, to create directory name
    // Directory name
    const directory = `uploads/${fileType}`;
    // /Directory name
    // Create a directory if it doesn't exist
    fs.mkdirSync(directory, { recursive: true });
    return cb(null, directory);
    // /Create a directory if it doesn't exist
  },
  filename: (req, file, cb) => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    cb(null, (postId || userId) + '-' + nanoid() + '.webp');
  },
});
//  filters and limits
export const upload = multer({
  storage: storage,
  limits: {
    files: 1, // allow up to 5 files per request,
    // fileSize: 1 * 1024 * 1024  
    // fileSize: 524288,  //0.5 Mb
    //fileSize: 1048576, //1 Mb
    fileSize: 314572.8 //0.3 Mb
  },
  fileFilter: (_, file, cb) => {
    // allow images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      return cb(new Error('Only image are allowed.'), false)
    }
    cb(null, true)
  },
});
//  /filters and limits
export const multerErrorMessages = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send("Multer error: " + err.message);
  } else {
    next();
  }
};