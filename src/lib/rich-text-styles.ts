/**
 * Reusable Tailwind CSS classes for rich text content styling
 * Supports all Payload CMS rich text features including:
 * - Headings (H1, H2, H3)
 * - Text formatting (bold, italic, underline)
 * - Lists (ordered, unordered, checklists)
 * - Blockquotes
 * - Links
 * - Horizontal rules
 * - Paragraphs and spacing
 */
export const richTextStyles = [
	// Headings
	"[&_h1]:text-2xl",
	"[&_h1]:font-bold",
	"[&_h1]:mb-4",
	"[&_h2]:text-xl",
	"[&_h2]:font-semibold",
	"[&_h2]:mb-3",
	"[&_h3]:text-lg",
	"[&_h3]:font-semibold",
	"[&_h3]:mb-2",

	// Text formatting
	"[&_strong]:font-semibold",
	"[&_em]:italic",
	"[&_u]:underline",

	// Lists
	"[&_ul]:mb-4",
	"[&_ol]:mb-4",
	"[&_li]:mb-1",
	"[&_ul_li]:list-disc",
	"[&_ul_li]:ml-4",
	"[&_ol_li]:list-decimal",
	"[&_ol_li]:ml-4",

	// Blockquotes
	"[&_blockquote]:border-l-4",
	"[&_blockquote]:border-[#c1121f]",
	"[&_blockquote]:pl-4",
	"[&_blockquote]:italic",
	"[&_blockquote]:text-foreground/70",
	"[&_blockquote]:mb-4",

	// Links
	"[&_a]:text-[#c1121f]",
	"[&_a]:underline",
	"[&_a]:hover:no-underline",
	"[&_a]:hover:text-[#a20e1b]",

	// Horizontal rules
	"[&_hr]:border-t",
	"[&_hr]:border-foreground/20",
	"[&_hr]:my-6",

	// Paragraphs and spacing
	"[&_p]:mb-4",
	"[&_p:last-child]:mb-0",

	// Code blocks
	"[&_code]:bg-foreground/10",
	"[&_code]:px-1",
	"[&_code]:py-0.5",
	"[&_code]:rounded",
	"[&_code]:text-sm",
	"[&_pre]:bg-foreground/10",
	"[&_pre]:p-4",
	"[&_pre]:rounded-lg",
	"[&_pre]:overflow-x-auto",
	"[&_pre]:mb-4",
].join(" ");
