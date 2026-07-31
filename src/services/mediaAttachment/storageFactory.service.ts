import {env} from "../../config/env.js";
import CloudinaryStorage from "./drivers/cloudinaryStorage.js";
import LocalStorage from "./drivers/localStorage.js";
import PublicStorage from "./drivers/publicStorage.js";

class StorageFactory {

    static make() {

        switch (env.ATTACHMENT_DISK) {

            case "cloudinary":
                return CloudinaryStorage;

            case "local":
                return LocalStorage;

            case "public":
                return new PublicStorage();

            default:
                throw new Error(
                    `Unsupported storage disk: ${env.ATTACHMENT_DISK}`
                );

        }

    }

}

export default StorageFactory;