import influencerOnboardingRepo from "../../repositories/influencer/influencerOnboarding.repositories";
import { InfluencerSignupStep } from "../../utils/constants/influencerSignupSteps.js";
import {generateCode} from "../../utils/generateCode.js";


class InfluencerOnboardingService {


    async create(data: any, options?: any) {
        const { userCode, signupToken, expiresAt } = data;

        return influencerOnboardingRepo.create(
            {
                onboarding_code: generateCode(),
                user_code: userCode,
                current_step: InfluencerSignupStep.BASIC_INFO,
                completed_step: 0,
                status: "pending",
                signup_token: signupToken,
                expires_at: expiresAt,
            },
            options
        );
    }


    async getByUserCode(userCode:string, options?: any) {

        const onboarding = await influencerOnboardingRepo.findOne(
            {
                user_code: userCode
            },
            options
            );

        if(!onboarding){
            throw new Error("Onboarding not found");
        }
        // console.log(onboarding);
        return onboarding;

    }

    async completeStep(userCode:string, step:number, options?: any) {

        const onboarding = await this.getByUserCode(userCode, options);

        if (onboarding.current_step !== step) {
            throw new Error(`Expected step ${onboarding.current_step}, received step ${step}`);
        }


        const isLastStep = step === InfluencerSignupStep.PORTFOLIO;

        await influencerOnboardingRepo.update(
            {
                user_code: userCode
            },
            {
                completed_step: step,
                current_step: isLastStep ? step : step + 1,
                status: isLastStep ? "completed" : "pending"
            },
            options
        );

        return {
            currentStep: isLastStep ? step : step + 1,
            completedStep: step
        };
    }

    async canAccessStep(userCode:string, step:number){
        const onboarding = await this.getByUserCode(userCode);

        if(step > onboarding.current_step){
            throw new Error("Complete previous steps first");
        }
        return true;
    }


}


export default new InfluencerOnboardingService();