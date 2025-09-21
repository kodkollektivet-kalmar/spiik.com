import type { CollectionConfig } from "payload";
import { BoardMembers } from "./board-members";
import { Media } from "./media";
import { Users } from "./users";

export const collections: CollectionConfig[] = [
	// Admin group
	Users,

	Media,

	// Content group
	BoardMembers,
];
