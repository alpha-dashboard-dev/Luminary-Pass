import { FastifyInstance } from "fastify";

import authRoutes from "./authentication/auth.routes.js";
import userRoutes from "./user/user.routes";
import userRoleRoutes from "./user/userRole.routes"
import permissionRoutes from "./user/permission.routes"
import rolePermissionRoutes from "./user/rolePermission.routes"
import organizationRoleRoutes from "./organization/organization.routes"
import businessRoutes from "./business/business.routes"
import venueRoutes from "./venue/venue.routes"
import venueScheduleRoutes from "./venue/venueSchedule.routes";
import categoryRoutes from "./category/category.routes"
import locationRoutes from "./location/location.routes"
import influencerRoutes from "./influencer/influencer.routes"
import eventRoutes from "./event/event.routes"
import ratingRoutes from "./influencer/influencerRating.routes";
import invitationRoutes from "./event/invitation.routes";
import venueLocationRoutes  from "./venue/venueLocation.routes";
import venueAttachmentRoutes from "./venue/venueAttachment.routes";
import abilityRoutes from "./user/ability.routes";
import attachmentRoutes from "./mediaAttachment/attachement.routes";

import participantRoutes from "./event/participant.routes";

export default async function routes(fastify: FastifyInstance) {
    fastify.register(authRoutes, { prefix: "/auth" });

    // fastify.register(userRoutes, { prefix: "/users" });
    // fastify.register(userRoleRoutes, { prefix: "/roles" });
    // fastify.register(permissionRoutes, { prefix: "/permissions" });
    // fastify.register(rolePermissionRoutes,{ prefix: "/role-permissions" })
    // fastify.register(abilityRoutes, { prefix: "/abilities" });

    fastify.register(organizationRoleRoutes, { prefix: "/organizations" });
    // fastify.register(businessRoutes, { prefix: "/businesses" });
    //
    // fastify.register(venueRoutes, { prefix: "/venues" });
    // fastify.register(venueScheduleRoutes, { prefix: "/venue-schedules" });
    // fastify.register(venueLocationRoutes, { prefix: "/venue-locations" });
    // fastify.register(venueAttachmentRoutes, { prefix: "/venue-attachments" });
    //
    // fastify.register(categoryRoutes, { prefix: "/categories" });
    //
    // fastify.register(locationRoutes, { prefix: "/locations" });
    // fastify.register(influencerRoutes, { prefix: "/influencers" });
    // fastify.register(ratingRoutes, { prefix: "/ratings" });
    // fastify.register(eventRoutes, { prefix: "/events" });
    //
    // fastify.register(invitationRoutes, { prefix: "/invitations" });
    //
    // fastify.register(attachmentRoutes, { prefix: "/attachments" });
    // fastify.register(participantRoutes, { prefix: "/event-participants" });
}