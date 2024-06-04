export type PrimaryNavigation = {
	// Determines what markup is rendered and the ultimate action is taken
	type: "button" | "link";

	// For links only
	url?: string;

	// String value to show in the nav
	label?: string;

	// Some icon to render
	icon: string;
};

export const primaryNavigation: PrimaryNavigation[] = [
	{
		type: "link",
		url: "/",
		icon: "logo",
	},
	{
		type: "link",
		url: "/pokedex",
		icon: "pokemon-silhouette",
		label: "Pokedex",
	},
	{
		type: "link",
		url: "/attackdex",
		icon: "attack-silhouette",
		label: "Attackdex",
	},
];
