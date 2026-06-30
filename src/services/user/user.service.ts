import repo from "../../repositories/user/user.repository.js"
import { hashPassword} from "../../utils/hashPassword.js";
import { generateCode } from "../../utils/generateCode.js";

class UserService {
    async create(data: any, actor: any) {

        if (!actor) throw new Error("Unauthorized");

        const exists = await repo.findOne(
            {email: data.email}
        );

        if (exists) {
            throw new Error("Email already exists");
        }

        const userCode = generateCode();

        const password = await hashPassword(data.password);

        return await repo.create({
            userCode,
            business_code: data.business_code,

            user_type: data.user_type,

            email: data.email.trim().toLowerCase(),

            password,

            name: data.name,

            phone: data.phone,

            employee_type: data.employee_type || null,

            is_active: data.is_active || "active",
        });
    }
}