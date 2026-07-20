import path from "path";
import { generateCode } from "../../../utils/generateCode";

class FileNameGenerator {

    static generate(entityCode: string, category: string, originalName: string) {

        const extension = path.extname(originalName);

        const timestamp = new Date()
            .toISOString()
            .replace(/[-:.TZ]/g, "");

        return `${entityCode}_${category}_${timestamp}_${generateCode()}${extension}`;

    }

}

export default FileNameGenerator;