import { computed, effect, inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import {
	getState,
	patchState,
	signalStore,
	withComputed,
	withHooks,
	withMethods,
	withState,
} from "@ngrx/signals";
import {
	addEntities,
	updateEntity,
	withEntities,
} from "@ngrx/signals/entities";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { PokeAPIService } from "../services/poke-api.service";
import type { ComputedMoveByVersionGroup, Pokemon } from "./pokemon.model";

type PokemonState = {
	isLoading: boolean;
	filter: { query: string; order: "asc" | "desc" };
	selectedEntityId: string | null;
};

export type SelectedEntityState = { selectedEntityId: string | null };

const initialState: PokemonState = {
	isLoading: false,
	filter: { query: "", order: "desc" },
	selectedEntityId: null,
};

export const PokemonStore = signalStore(
	{ providedIn: "root" },

	// Additional state thats not included in withEntities
	withState(initialState),

	// May main CRUD state for Pokemon data
	withEntities<Pokemon>(),

	// Any methods the state should call
	withMethods((store, pokemonApiService = inject(PokeAPIService)) => ({
		getAll: rxMethod<null>(
			pipe(
				tap(() => patchState(store, { isLoading: true })),
				switchMap(() => {
					return pokemonApiService.getAllPokemon$().pipe(
						tapResponse({
							next: (response) =>
								patchState(
									store,
									addEntities(response.results, { idKey: "name" }),
								),
							error: console.error,
							finalize: () => patchState(store, { isLoading: false }),
						}),
					);
				}),
			),
		),

		get: rxMethod<string | number>(
			pipe(
				tap(() => patchState(store, { isLoading: true })),
				switchMap((key) => {
					return pokemonApiService.getPokemon$(key).pipe(
						tapResponse({
							next: (pokemon) => {
								patchState(
									store,
									updateEntity({ id: pokemon.name, changes: pokemon }),
								);
								patchState(store, { selectedEntityId: pokemon.name });
							},
							error: console.error,
							finalize: () => patchState(store, { isLoading: false }),
						}),
					);
				}),
			),
		),
	})),

	withComputed(({ entities, filter, entityMap, selectedEntityId }) => ({
		pokemonCount: computed(() => entities().length),
		filteredPokemon: computed(() => {
			const queryString = filter.query();
			return entities().filter((pokemon) => pokemon.name.includes(queryString));
		}),
		sortedPokemon: computed(() => {
			const direction = filter.order() === "asc" ? 1 : -1;
			return entities().sort(
				(a: Pokemon, b: Pokemon) => direction * a.name.localeCompare(b.name),
			);
		}),
		selected: computed(() => {
			const selectedId = selectedEntityId();
			return selectedId ? entityMap()[selectedId] : null;
		}),
		selectedMoves: computed(() => {
			const selectedId = selectedEntityId();
			const selected = selectedId ? entityMap()[selectedId] : null;
			if (!selected || !selected.moves) return null;

			const versionGroup: {
				[versionGroup: string]: ComputedMoveByVersionGroup[];
			} = {};
			for (const move of selected.moves) {
				for (const version of move.version_group_details) {
					const versionName = version.version_group.name;
					if (!versionGroup[versionName]) {
						// Initialise if group doesnt exist yet
						versionGroup[versionName] = [];
					}

					versionGroup[versionName].push({
						name: move.move.name,
						url: move.move.url,
						level_learned_at: version.level_learned_at,
						move_learn_method: {
							...version.move_learn_method,
						},
						version_group: {
							...version.version_group,
						},
					});
				}
			}

			return versionGroup;
		}),
	})),

	// Loads all required data on startup
	withHooks({
		onInit: (store) => {
			effect(() => {
				const state = getState(store);
				// console.log(`${name} state changed`, state);
			});

			store.getAll(null);
		},
	}),
);
