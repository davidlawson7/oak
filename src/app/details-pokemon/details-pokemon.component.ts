import { Component, type OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PokemonStore } from "../core/state/pokemon.store";

@Component({
	selector: "oak-details-pokemon",
	standalone: true,
	imports: [],
	templateUrl: "./details-pokemon.component.html",
	styleUrl: "./details-pokemon.component.scss",
})
export class DetailsPokemonComponent implements OnInit {
	readonly pokemonStore = inject(PokemonStore);
	private readonly activatedRoute = inject(ActivatedRoute);

	pokemonName?: string;

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((routeParams) => {
			this.pokemonName = routeParams["name"];
			this.pokemonStore.get(this.pokemonName as string);
		});
	}
}
