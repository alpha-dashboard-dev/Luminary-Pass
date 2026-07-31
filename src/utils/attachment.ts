export const  parseMimeType = (mimetype: string)  => {
    const [fileType, extension] = mimetype.split("/");

    return {
        fileType,
        extension
    };
}



// console.log(parseMimeType("image/png"));