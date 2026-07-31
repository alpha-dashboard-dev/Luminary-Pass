class StorageInterface {

    async upload(file, options = {}) {
        throw new Error("upload() not implemented");
    }

    async delete(fileIdentifier) {
        throw new Error("delete() not implemented");
    }

    async move(fileIdentifier, options = {}) {
        throw new Error("move() not implemented");
    }

    async replace(fileIdentifier, file, options = {}) {
        throw new Error("replace() not implemented");
    }

}

export default StorageInterface;