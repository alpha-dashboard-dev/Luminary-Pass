import {FastifyReply, FastifyRequest} from "fastify";
import {validateInfluencerAccountRegistration} from "../../utils/validator";
import registrationService from "../../services/registration/regsitration.service";


class RegistrationController {

    // Influencer Registration through website
    async registerInfluencer(req: FastifyRequest, reply: FastifyReply) {

        try {

            const  data = req.body as any;

            validateInfluencerAccountRegistration(data)

            const result = await registrationService.registerInfluencer(data)

            return reply.status(200).send({
                success: true,
                message: "Business Registration successful!!",
                data: result
            });

        } catch (err: any) {

            return reply.status(401).send({
                success: false,
                message: err.message
            });

        }
    }

}

export default new RegistrationController();