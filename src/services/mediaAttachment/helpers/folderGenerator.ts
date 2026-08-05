class FolderGenerator {

    static generate(entityType: string, category: string): string {

        const folders: Record<string, Record<string, string>> = {

            user: {
                profile_picture: "user/profile",
                cover_image: "user/cover_image",
                gallery: "user/gallery",
                logo: "user/logo",
                banner: "user/banner",
                portfolio: "user/portfolio",
                proof: "user/proof",
                menu: "user/menu",
                contract: "user/contract",
                invoice: "user/invoice",
                document: "user/documents",
                reference: "user/reference",
                social_link: "user/social_link",
                other: "user/other",
            },

            influencer: {
                profile_picture: "influencer/profile",
                portfolio: "influencer/portfolio",
                proof: "influencer/proofs",
                menu: "influencer/menu",
                contract: "influencer/contract",
                invoice: "influencer/invoice",
                document: "influencer/document",
                reference: "influencer/reference",
                social_link: "influencer/social_link",
                other: "influencer/other",
                cover_image: "influencer/cover_image",
                gallery: "influencer/gallery",
                logo: "influencer/logo",
                banner: "influencer/banner",
            },

            business: {
                logo: "business/logos",
                cover_image: "business/covers",
                document: "business/documents",
                gallery: "business/gallery",
                banner: "business/banner",
                portfolio: "business/portfolio",
                proof: "business/proofs",
                menu: "business/menu",
                contract: "business/contract",
                invoice: "business/invoice",
                reference: "business/reference",
                social_link: "business/social_link",
                other: "business/other"
            },

            venue: {
                gallery: "venue/gallery",
                menu: "venue/menu",
                logo: "venue/logo",
                portfolio: "venue/portfolio",
                cover_image: "venue/cover_image",
                banner: "venue/banner",
                proof: "venue/proof",
                contract: "venue/contract",
                invoice: "venue/invoice",
                document: "venue/document",
                reference: "venue/reference",
                social_link: "venue/social_link",
                other: "venue/other",

            },

            event: {
                banner: "event/banners",
                gallery: "event/gallery",
                proof: "event/proofs",
                logo: "event/logo",
                portfolio: "event/portfolio",
                cover_image: "event/cover_image",
                menu: "event/menu",
                contract: "event/contract",
                invoice: "event/invoice",
                document: "event/document",
                reference: "event/reference",
                social_link: "event/social_link",
                other: "event/other",
            },

            checklist: {
                reference: "checklist/references",
                social_link: "checklist/social_link",


            },

            participant_checklist: {
                proof: "participant-checklist/proofs",
            },

        };

        return (
            folders[entityType]?.[category] ??
            `${entityType}/${category}`
        );

    }

}

export default FolderGenerator;