import type { Field } from "payload";
import { MEDIA } from "@/collections/constants";

const heroFields: Field[] = [
	{ name: "heroTitle", type: "text" },
	{ name: "heroSubtitle", type: "text" },
	{ name: "heroImage", type: "upload", relationTo: MEDIA },
	{ name: "heroBadge", type: "text" },
];

const sectionsField: Field = {
	name: "sections",
	type: "array",
	labels: { singular: "Section", plural: "Sections" },
	fields: [
		{ name: "title", type: "text" },
		{ name: "text", type: "richText" },
		{ name: "image", type: "upload", relationTo: MEDIA },
		{ name: "ctaLabel", type: "text" },
		{ name: "ctaUrl", type: "text" },
	],
};

const membershipLinkFields: Field[] = [
	{
		name: "membershipLink",
		type: "text",
		label: "Membership Link",
		admin: {
			description:
				"Länk till vart medlemskap kan köpas, ex. länk till att ladda ner Orbi appen",
		},
	},
	{
		name: "membershipLinkDescription",
		type: "text",
		label: "Membership Link Description",
		admin: {
			description:
				"Beskrivning för länken till medlemskap, ex. 'Ladda ner appen och sök på SPIIK för att köpa medlemskap'",
		},
	},
];

const membershipTiersField: Field = {
	name: "membershipTiers",
	type: "array",
	labels: { singular: "Membership Tier", plural: "Membership Tiers" },
	fields: [
		{ name: "label", type: "text", required: true },
		{ name: "title", type: "text", required: true },
		{ name: "description", type: "textarea", required: true },
		{
			name: "prices",
			type: "array",
			labels: { singular: "Price", plural: "Prices" },
			fields: [
				{
					name: "years",
					type: "select",
					options: [
						{ label: "1 år", value: "1" },
						{ label: "2 år", value: "2" },
						{ label: "3 år", value: "3" },
					],
					required: true,
				},
				{ name: "amount", type: "text", required: true },
			],
			minRows: 1,
			maxRows: 3,
		},
		{
			name: "gradient",
			type: "select",
			options: [
				{
					label: "Default (Warm Orange)",
					value: "from-[#FFF4DE] via-white to-[#FFE6C8]",
				},
				{
					label: "Cool Blue",
					value: "from-[#EAE9FF] via-white to-[#D9F1FF]",
				},
				{
					label: "Soft Red",
					value: "from-[#FFE8E8] via-white to-[#FFE0E0]",
				},
				{
					label: "Fresh Green",
					value: "from-[#E8F5E8] via-white to-[#E0F0E0]",
				},
			],
			defaultValue: "from-[#FFF4DE] via-white to-[#FFE6C8]",
		},
	],
};

const carouselImagesField: Field = {
	name: "carouselImages",
	type: "array",
	label: "Carousel Images",
	labels: { singular: "Image", plural: "Images" },
	fields: [
		{
			name: "image",
			type: "upload",
			relationTo: MEDIA,
			required: true,
		},
	],
	admin: {
		description: "Images to display in the carousel section",
	},
};

const sponsorsField: Field = {
	name: "sponsors",
	type: "array",
	label: "Sponsors",
	labels: { singular: "Sponsor", plural: "Sponsors" },
	fields: [
		{
			name: "logo",
			type: "upload",
			relationTo: MEDIA,
			required: true,
			admin: {
				description: "Sponsor logo image",
			},
		},
		{
			name: "name",
			type: "text",
			required: true,
			admin: {
				description: "Sponsor company name",
			},
		},
		{
			name: "description",
			type: "textarea",
			admin: {
				description: "Short description about the sponsor",
			},
		},
		{
			name: "website",
			type: "text",
			admin: {
				description: "Sponsor website URL (optional)",
			},
		},
	],
	admin: {
		description: "List of sponsors with logos and descriptions",
	},
};

export {
	heroFields,
	sectionsField,
	membershipLinkFields,
	membershipTiersField,
	carouselImagesField,
	sponsorsField,
};
