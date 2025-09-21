import type { GlobalConfig } from "payload";
import { Navigation } from "./navigation";
import { pageGlobals } from "./pages";
import { SiteSettings } from "./site-settings";

export const globals: GlobalConfig[] = [
	Navigation,
	SiteSettings,
	...pageGlobals,
];
