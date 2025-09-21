import type { CollectionConfig } from "payload";
import { USERS } from "./constants";

export const Users: CollectionConfig = {
	slug: USERS,
	admin: {
		useAsTitle: "email",
	},
	auth: true,
	fields: [
		// Email added by default
		// Add more fields as needed
	],
};
