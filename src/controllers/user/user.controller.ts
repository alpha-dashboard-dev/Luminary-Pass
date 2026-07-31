import { FastifyReply, FastifyRequest } from "fastify";
import userService from "../../services/user/user.service";
import {validateUser} from "../../utils/validator.js";
import {ApiResponse} from "../../utils/response.js";
import businessService from "../../services/business/business.service.js";

class UserController {

    async create(req: FastifyRequest, reply: FastifyReply) {

        try{
            const data = req.body;
            // console.log(data);
            validateUser(data);
            const result =  await userService.create(data)
            return reply.status(200).send({
                success: true,
                message: "User created successfully",
                data: result
            });
        }
        catch (err: any) {
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    async getAll(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "role",
                    attributes: [],
                },
                {
                    alias: "organization",
                    attributes: [],
                },
                {
                    alias: "business",
                    attributes: [],
                },
                {
                    alias: "influencer",
                    attributes: [],
                }
            ]
            const data = await userService.getAll(
                    {
                        ...req.query,
                        include
                    },
                    req.user
                );

            return reply.status(200).send({
                success: true,
                data,
            });

        } catch (err: any) {
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    // Get by User code
    async getByUserCode(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";

            include = [
                {
                    alias: "role",
                    attributes: [],
                },
                {
                    alias: "organization",
                    attributes: [],
                },
                {
                    alias: "business",
                    attributes: [],
                },
                {
                    alias: "influencer",
                    attributes: [],
                }
            ]
            const userCode = String(req.params.userCode)
            const result = await userService.getByUserCode(
                userCode,
                {
                    ...req.query,
                    include
                },
                req.user,
            );

            return reply.status(200).send({
                success: true,
                result,
            });

        } catch (err: any) {

            return reply.status(404).send({
                success: false,
                message: err.message,
            });
        }
    }

    // Get By Any Field
    async getByField(req: FastifyRequest, reply: FastifyReply) {

        try {
            let include = req.query.include ?? "";
            include = [
                {
                    alias: "role",
                    attributes: [],
                },
                {
                    alias: "organization",
                    attributes: [],
                },
                {
                    alias: "business",
                    attributes: [],
                },
            ]
            const where = {...req.query};
            const result = await userService.getByField(
                where,
                {
                    ...req.query,
                    include
                },
                req.user,
            );

            return reply.status(200).send({
                success: true,
                result,
            });

        } catch (err: any) {

            return reply.status(404).send({
                success: false,
                message: err.message,
            });
        }
    }


    //Update User

    async update(req: FastifyRequest, reply: FastifyReply) {

        try {

            const userCode = String(req.params.userCode);

            const data = await userService.update(
                userCode,
                req.body,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "User updated successfully",
                data,
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message,
            });
        }
    }

    async deactivate(req: FastifyRequest, reply: FastifyReply) {
        try{
            const userCode = String(req.params.userCode)
            const data = req.body
            // console.log(data)
            await userService.deactivate(
                userCode,
                data,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "User deactivated",
                data,
            });


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

    //  DELETE User
    async delete(req: FastifyRequest, reply: FastifyReply) {

        try {
            const userCode = String(req.params.userCode)

            await userService.delete(
                userCode,
                req.user
            );

            return reply.status(200).send({
                success: true,
                message: "User permanently deleted"
            });

        } catch (err: any) {

            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
    }

   async sendProfileSetupLink(req: FastifyRequest, reply: FastifyReply) {

        try{

            const userCode = String(req.params.userCode)

            const result = await userService.sendProfileSetupLink(userCode);

            return reply.status(200).send({
                success: true,
                result,
            })


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
   }

   async verifySetupLink(req: FastifyRequest, reply: FastifyReply) {

        try{
                const { token } = req.query as { token: string };

                const result = await userService.verifySetupLink(token);
            return reply.type("text/html").send(`
<!DOCTYPE html>
<html>
<head>
    <title>Complete Profile</title>
</head>
<body style="font-family:Arial;max-width:500px;margin:50px auto">
    <h2>Complete Your Profile</h2>

    <form id="setupForm">

        <label>First Name</label><br/>
        <input id="firstName" required /><br/><br/>

        <label>Last Name</label><br/>
        <input id="lastName" required /><br/><br/>

        <label>Password</label><br/>
        <input id="password" type="password" required /><br/><br/>

        <label>Confirm Password</label><br/>
        <input id="confirmPassword" type="password" required /><br/><br/>

        <button type="submit">
            Complete Profile
        </button>

    </form>

    <p id="message"></p>

    <script>

        const token = "${token}";

        document
            .getElementById("setupForm")
            .addEventListener("submit", async (e) => {

                e.preventDefault();

                const body = {
                    token,
                    firstName: document.getElementById("firstName").value,
                    lastName: document.getElementById("lastName").value,
                    password: document.getElementById("password").value,
                    confirmPassword: document.getElementById("confirmPassword").value
                };

                const res = await fetch("/api/users/setup-profile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                });

                const data = await res.json();

                document.getElementById("message").innerHTML =
                    data.message;

            });

    </script>

</body>
</html>
`);
            //     return reply.status(200).send({
            //     success: true,
            //     result,
            // })


        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });

        }
   }



   async setupProfile(req: FastifyRequest, reply: FastifyReply) {
        try{

            const data = req.body;
            const result = await userService.setupProfile(data);

            return ApiResponse.success(
                reply,
                result,
                "Profile setup completed successfully",
            )

        }catch(err){
            return reply.status(400).send({
                success: false,
                message: err.message
            });
        }
   }


   async activateUserAccount(req: FastifyRequest, reply: FastifyReply) {
        try{

            const userCode = String(req.params.userCode)
            const data = req.body;


            const result = await userService.activateUserAccount(userCode, data, req.user);

            return ApiResponse.success(
                reply,
                result,
                "Account Activated successfully",
                200
            )

        }catch(err){
            return ApiResponse.error(
                reply,
                err.message,
                400,
                err,
                );
        }
   }
}

export default  new UserController();