import {env} from "../../../config/env.js";
import StorageInterface from "./storageInterface.js";

import path from "path";
import  fs  from "fs-extra";

class PublicStorage extends StorageInterface {

    async upload(file, options = {}) {

        const destination = path.join(

            process.env.PUBLIC_STORAGE_PATH,

            options.folder

        );

        await fs.ensureDir(destination);

        const filePath = path.join(destination, options.fileName);

        await fs.copy(file.filepath, filePath);

        return {

            disk: "public",

            path: filePath,

            secureUrl:

                env.PUBLIC_URL +

                "/" +

                options.folder +

                "/" +

                options.fileName,

        };

    }

    async delete(filePath) {

        return fs.remove(filePath);

    }

    async replace(filePath, file, options = {}) {

        await this.delete(filePath);

        return this.upload(file, options);

    }

    async move(filePath, options = {}) {

        return fs.move(

            filePath,

            options.newPath

        );

    }

}

export default PublicStorage;