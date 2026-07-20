import {env} from "../../../config/env.js";
import path from "path";
import fs from "fs-extra";

import StorageInterface from "./storageInterface";

class LocalStorage extends StorageInterface {

    async upload(file, options = {}) {

        const destination = path.join(

            env.LOCAL_STORAGE_PATH,

            options.folder

        );

        await fs.ensureDir(destination);

        const filePath = path.join(destination, options.fileName);

        await fs.copy(file.filepath, filePath);

        return {

            disk: "local",

            path: filePath,

            secureUrl: filePath,

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

export default LocalStorage;