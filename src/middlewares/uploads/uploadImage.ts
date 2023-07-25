import { Request, Response, NextFunction } from "express";
import upload from "../../config/uploads";

export function uploadImage() {
    return [ upload.single("image"), handleUploadError ]
}

function handleUploadError( err: Error | null, req: Request,
                            res: Response, next: NextFunction) {
    if( err ) {
        console.log( "Error", err );
        res.status(400).json({
            message: err.message
        })
    }
    else {
        next();
    }
}