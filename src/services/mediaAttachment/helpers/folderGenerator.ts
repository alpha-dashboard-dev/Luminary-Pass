class FolderGenerator {

    static generate(entityType: string, category: string): string {

        const folders: Record<string, Record<string, string>> = {

            user: {
                profile_picture: "users/profile",
                cover_image: "users/cover_image",
                gallery: "users/gallery",
                logo: "users/logo",
                banner: "users/banner",
                portfolio: "users/portfolio",
                proof: "users/proof",
                menu: "users/menu",
                contract: "users/contract",
                invoice: "users/invoice",
                document: "users/documents",
                reference: "users/reference",
                social_link: "users/social_link",
                other: "users/other",
            },

            influencer: {
                profile_picture: "influencers/profile",
                portfolio: "influencers/portfolio",
                proof: "influencers/proofs",
                menu: "influencers/menu",
                contract: "influencers/contract",
                invoice: "influencers/invoice",
                document: "influencers/document",
                reference: "influencers/reference",
                social_link: "influencers/social_link",
                other: "influencers/other",
                cover_image: "influencers/cover_image",
                gallery: "influencers/gallery",
                logo: "influencers/logo",
                banner: "influencers/banner",
            },

            business: {
                logo: "businesses/logos",
                cover_image: "businesses/covers",
                document: "businesses/documents",
                gallery: "businesses/gallery",
                banner: "businesses/banner",
                portfolio: "businesses/portfolio",
                proof: "businesses/proofs",
                menu: "businesses/menu",
                contract: "businesses/contract",
                invoice: "businesses/invoice",
                reference: "businesses/reference",
                social_link: "businesses/social_link",
                other: "businesses/other"
            },

            venue: {
                gallery: "venues/gallery",
                menu: "venues/menu",
                logo: "venues/logo",
                portfolio: "venues/portfolio",
                cover_image: "venues/cover_image",
                banner: "venues/banner",
                proof: "venues/proof",
                contract: "venues/contract",
                invoice: "venues/invoice",
                document: "venues/document",
                reference: "venues/reference",
                social_link: "venues/social_link",
                other: "venues/other",

            },

            event: {
                banner: "events/banners",
                gallery: "events/gallery",
                proof: "events/proofs",
                logo: "events/logo",
                portfolio: "events/portfolio",
                cover_image: "events/cover_image",
                menu: "events/menu",
                contract: "events/contract",
                invoice: "events/invoice",
                document: "events/document",
                reference: "events/reference",
                social_link: "events/social_link",
                other: "events/other",
            },

            checklist: {
                reference: "checklists/references",
                social_link: "checklists/social_link",


            },

            participant_checklist: {
                proof: "participant-checklists/proofs",
            },

        };

        return (
            folders[entityType]?.[category] ??
            `${entityType}/${category}`
        );

    }

}

export default FolderGenerator;