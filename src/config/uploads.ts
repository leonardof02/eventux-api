import path from "path";
import { File } from "buffer";

import { Request } from "express";
import multer, { FileFilterCallback, Multer } from "multer";

import { MulterErrorCallback } from "../types";

const maxSize = 1e+8;
const maxFiles = 3;
const acceptedMIMETypes = ["image/png", "image/jpg", "image/jpeg", "image/svg"];

// Handles destination folder
function destination(req: Request, file: Express.Multer.File, cb: MulterErrorCallback) {
    cb(null, "public/images/events");
}

// Handles filename of uploaded files
function filename(req: Request, file: Express.Multer.File, cb: MulterErrorCallback) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
}

function fileFilter(req: Request, file: Express.Multer.File, cb: (any, boolean) => void) {
    if (acceptedMIMETypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb( new Error("Tipo de archivo no admitido"), false );
    }
}

// Handles how to storage configuration
const storage = multer.diskStorage({
    destination,
    filename
});

// Multer config
const upload = multer({
    storage,
    fileFilter,
    limits: {
        files: maxFiles,
        fileSize: maxSize
    }
});

export default upload;
