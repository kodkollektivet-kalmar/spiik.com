import type { CollectionConfig } from "payload";

import { Media } from "./media";
import { Users } from "./users";

export const collections: CollectionConfig[] = [
	// Admin group
	Users,

	Media,
];
