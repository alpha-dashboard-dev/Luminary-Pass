class AttachmentValidator {

    static validate(file: any) {

        if (!file) {
            throw new Error("File is required.");
        }

        if (!file.mimetype) {
            throw new Error("Invalid file.");
        }

        const allowedMimeTypes = [

            "image/jpeg",
            "image/png",
            "image/webp",
            "video/mp4",
            "video/quicktime",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new Error(
                `Unsupported file type: ${file.mimetype}`
            );
        }

        const maxSize = 50 * 1024 * 1024;

        if (file.size > maxSize) {
            throw new Error(
                "Maximum upload size is 50 MB."
            );
        }

    }

}

export default AttachmentValidator;