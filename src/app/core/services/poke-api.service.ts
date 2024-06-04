import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { type Observable, firstValueFrom } from "rxjs";
import type { Pokemon, PokemonResponse } from "../state/pokemon.model";

@Injectable({
	providedIn: "root",
})
/**
 * This purpose of this service is to fetch Pokemon data from the PokeAPI.
 */
export class PokeAPIService {
	private readonly http = inject(HttpClient);

	getAllPokemon$(): Observable<PokemonResponse> {
		const limit = 2000;
		return this.http.get<PokemonResponse>(
			`https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
		);
	}

	getPokemon$(value: string | number): Observable<Pokemon> {
		return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${value}`);
	}

	getPokemon(value: string | number): Promise<Pokemon> {
		return firstValueFrom(
			this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${value}`),
		);
	}

	// getAllMoves$(limit = 2000): Observable<any> {
	// 	return this.http.get<any>(`https://pokeapi.co/api/v2/move?limit=${limit}`);
	// }

	// getAllMoves(limit = 2000): Promise<any> {
	// 	return firstValueFrom(
	// 		this.http.get<any>(`https://pokeapi.co/api/v2/move?limit=${limit}`),
	// 	);
	// }
}
