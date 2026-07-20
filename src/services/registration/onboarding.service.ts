import influencerOnboardingRepo from "../../repositories/influencer/influencerOnboarding.repositories";
import { InfluencerSignupStep } from "../../utils/constants/influencerSignupSteps.js";
import {generateCode} from "../../utils/generateCode.js";


class InfluencerOnboardingService {


    async create(data: any, options?: any) {
        const { userCode } = data;

        return influencerOnboardingRepo.create(
            {
                onboarding_code: generateCode(),
                user_code: userCode,
                current_step: InfluencerSignupStep.BASIC_INFO,
                completed_step: 0,
            },
            options
        );
    }


    async getByUserCode(userCode:string){

        const onboarding = await influencerOnboardingRepo.findOne(
            {
                user_code: userCode
            });

        if(!onboarding){
            throw new Error("Onboarding not found");
        }
        // console.log(onboarding);
        return onboarding;

    }

    async completeStep(userCode: string, step: number) {
        const onboarding = await this.getByUserCode(userCode);

        console.log(onboarding);

        await influencerOnboardingRepo.update(
            onboarding.id,
            {
                completed_step: step,
                current_step: step + 1,
            }
        );

        return {
            currentStep: step + 1,
            completedStep: step,
        };
    }

    // async completeStep(userCode:string, step:number){
    //     console.log(userCode, step);
    //
    //
    //     const onboarding = await this.getByUserCode(userCode);
    //
    //
    //
    //     let completed = onboarding.completed_step|| [];
    //
    //     if(!completed.includes(step)){
    //         completed.push(step);
    //     }
    //
    //     await influencerOnboardingRepo.update(
    //
    //         onboarding.id,
    //         {
    //             completed_step: completed,
    //             current_step:   step + 1
    //         }
    //
    //     );
    //
    //     return {
    //         currentStep: step + 1,
    //         completedSteps: completed
    //
    //     };
    //
    // }

    async canAccessStep(
        userCode:string,
        step:number
    ){


        const onboarding =
            await this.getByUserCode(userCode);



        if(onboarding.currentStep < step){

            throw new Error(
                "Complete previous steps first"
            );

        }


        return true;

    }


}


export default new InfluencerOnboardingService();