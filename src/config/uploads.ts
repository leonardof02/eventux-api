import multer from "multer"

const upload = multer({
    dest: "public/images/events",
});

export default upload;