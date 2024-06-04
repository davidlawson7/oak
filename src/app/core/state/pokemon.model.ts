export type PokemonResponse = {
	count: number;
	next: string;
	previous: string;
	results: Pokemon[];
};

export type Pokemon = {
	name: string;
	url: string;

	// Lazy loaded when Pokemon is selected
	id?: number;
	base_experience?: number;
	height?: number;
	is_default?: boolean;
	order?: number;
	weight?: number;
	abilities?: AbilityWrapper[];
	moves?: MoveWrapper[];
};

export type AbilityWrapper = {
	slot: number;
	is_hidden: boolean;
	ability: {
		name: string;
		url: string;
	};
};

export type MoveWrapper = {
	move: Move;
	version_group_details: VersionGroupDetail[];
};

export type Move = {
	name: string;
	url: string;
};

export type VersionGroupDetail = {
	level_learned_at: number;
	move_learn_method: {
		name: string;
		url: string;
	};
	version_group: {
		name: string;
		url: string;
	};
};

export type ComputedMoveByVersionGroup = {
	name: string;
	url: string;
	level_learned_at: number;
	move_learn_method: {
		name: string;
		url: string;
	};
	version_group: {
		name: string;
		url: string;
	};
};
