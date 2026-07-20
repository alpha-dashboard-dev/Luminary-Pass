import influencerSignupService from "../../services/registration/influencerSignup.service";
import onboardingService from "../../services/registration/onboarding.service.js";
import {validateInfluencerBasicInfoRegistration} from "../../utils/validator.js";


class InfluencerSignupController {


    // Step 1
    async basicInfo(req:any, reply:any){

        const data = req.body;

        // console.log(data)

        validateInfluencerBasicInfoRegistration(data)

        const result = await influencerSignupService.basicInfo(data);

        return reply.send({
            success:true,
            data:result
        });


    }

    // Step 2
    async connectInstagram(req:any,reply:any){


        const result = await influencerSignupService.connectInstagram(
                req.body

            );


        return reply.send({

            success:true,

            data:result

        });


    }

    // Step 3
    async uploadVerification(req:any,reply:any){


        const file =
            await req.file();


        const userCode =
            req.user.userCode;



        const result =
            await influencerSignupService.uploadVerification(

                userCode,

                file

            );



        return reply.send({

            success:true,

            data:result

        });


    }

//     Step 4
    async profile(req:any,reply:any){


        const result =
            await influencerSignupService.profile(

                req.user.userCode,

                req.body

            );


        return reply.send({

            success:true,

            data:result

        });


    }

//     Step 5: upload portfolio Images
    async portfolio(req:any,reply:any){


        const files=[];


        for await(
            const file of req.files()
            ){

            files.push(file);

        }



        const result =
            await influencerSignupService.portfolio(

                req.user.userCode,

                files

            );



        return reply.send({

            success:true,

            data:result

        });


    }

//     Resume status
    async status(req:any,reply:any){


        const result = await onboardingService.getByUserCode(
                req.user.userCode
            );



        return reply.send({

            success:true,

            data:result

        });


    }


}


export default new InfluencerSignupController();