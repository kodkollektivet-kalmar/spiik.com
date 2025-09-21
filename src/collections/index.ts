import type { CollectionConfig } from "payload";

import { Media } from "./media2";
import { Users } from "./users2";

export const collections: CollectionConfig[] = [
	// Admin group
	Users,

	Media,
];
