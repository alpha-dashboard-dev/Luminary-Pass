class FolderGenerator {

    static generate(entityType: string, category: string): string {

        const folders: Record<string, Record<string, string>> = {

            user: {
                profile_picture: "users/profile",
                document: "users/documents",
            },

            influencer: {
                profile_picture: "influencers/profile",
                portfolio: "influencers/portfolio",
                proof: "influencers/proofs",
            },

            business: {
                logo: "businesses/logos",
                cover_image: "businesses/covers",
                document: "businesses/documents",
            },

            venue: {
                gallery: "venues/gallery",
                menu: "venues/menu",
                logo: "venues/logo",
            },

            event: {
                banner: "events/banners",
                gallery: "events/gallery",
                proof: "events/proofs",
            },

            checklist: {
                reference: "checklists/references",
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