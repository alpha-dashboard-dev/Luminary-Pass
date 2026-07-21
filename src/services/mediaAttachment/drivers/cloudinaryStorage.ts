import StorageInterface from "./storageInterface";
import cloudinary,   { CLOUDINARY_FOLDER } from "../../../config/cloudinary";

class CloudinaryStorage extends StorageInterface {

    async upload(file, options = {}) {

        const folder = options.folder ? `${CLOUDINARY_FOLDER}/${options.folder}` : CLOUDINARY_FOLDER;

        const result = await new Promise((resolve, reject) => {

            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder,
                    public_id: options.fileName,
                    overwrite: false,
                    resource_type: "auto",
                },
                (error, result) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }

                }
            );


            file.file.pipe(uploadStream);

        });


        return {

            disk: "cloudinary",
            publicId: result.public_id,
            secureUrl: result.secure_url,
            bytes: result.bytes,
            format: result.format,
            width: result.width,
            height: result.height,
            folder: result.folder,
        };
    }

    // async upload(file, options = {}) {
    //
    //     console.log(file.filepath);
    //
    //     const result = await cloudinary.uploader.upload(file.filepath, {
    //
    //         folder: options.folder,
    //
    //         public_id: options.fileName,
    //
    //         overwrite: false,
    //
    //         resource_type: "auto",
    //
    //     });
    //
    //     return {
    //         disk: "cloudinary",
    //         publicId: result.public_id,
    //         secureUrl: result.secure_url,
    //         bytes: result.bytes,
    //         format: result.format,
    //         width: result.width,
    //         height: result.height,
    //         folder: result.folder,
    //     };
    //
    // }

    async delete(publicId) {

        return cloudinary.uploader.destroy(publicId, {

            resource_type: "auto",

        });

    }

    async replace(publicId, file, options = {}) {

        await this.delete(publicId);

        return this.upload(file, options);

    }

    async move(publicId, options = {}) {

        const result = await cloudinary.uploader.rename(

            publicId,

            options.newPublicId,

            {

                overwrite: true,

            }

        );

        return result;

    }

}

export default new CloudinaryStorage();