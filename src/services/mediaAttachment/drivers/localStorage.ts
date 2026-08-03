import { env } from "../../../config/env.js";
import path from "path";
import fsExtra from "fs-extra";

import StorageInterface from "./storageInterface.js";


class LocalStorage extends StorageInterface {

    async upload(file: any, options: any = {}) {

        const destination = path.join(
            env.LOCAL_STORAGE_PATH,
            options.folder || ""
        );

        await fsExtra.ensureDir(destination);

        const filePath = path.join(
            destination,
            options.fileName || file.filename
        );


        // Case 1: Buffer available (Multer, custom uploads)
        if (file.buffer) {
            await fsExtra.writeFile(filePath, file.buffer);
        }

        // Case 2: Fastify multipart
        else if (file.toBuffer) {
            const buffer = await file.toBuffer();
            await fsExtra.writeFile(filePath, buffer);
        }

        // Case 3: Stream upload (better for large files)
        else if (file.file) {
            await pipeline(
                file.file,
                fs.createWriteStream(filePath)
            );
        }

        // Case 4: Existing file path
        else if (file.path || file.filepath) {
            await fsExtra.copy(
                file.path || file.filepath,
                filePath
            );
        }

        else {
            throw new Error("Unsupported file format");
        }


        return {
            disk: "local",
            path: filePath,
            secureUrl: filePath,
            fileName: options.fileName || file.filename,
            mimeType: file.mimetype
        };
    }



    async delete(filePath) {
        return fsExtra.remove(filePath);

    }


    async replace(filePath, file, options = {}) {

        await this.delete(filePath);

        return this.upload(file, options);

    }


    async move(filePath, options = {}) {

        return fsExtra.move(
            filePath,
            options.newPath
        );

    }

}


export default new LocalStorage();