import { env } from "../../../config/env.js";
import path from "path";
import fsExtra from "fs-extra";
import fs from "fs";
import { pipeline } from "stream/promises";

import StorageInterface from "./storageInterface.js";


class LocalStorage extends StorageInterface {


    async upload(file, options = {}) {

        // console.log(file, options);

        const destination = path.join(
            env.LOCAL_STORAGE_PATH,
            options.folder
        );

        // console.log(destination);
        await fsExtra.ensureDir(destination);


        const filePath = path.join(
            destination,
            options.fileName
        );

        await fsExtra.writeFile(filePath, file.buffer);

        // await pipeline(file.stream, fs.createWriteStream(filePath));
        // await fs.copy(file.filepath, filePath);
        return {
            disk: "local",
            path: filePath,
            secureUrl: filePath,
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