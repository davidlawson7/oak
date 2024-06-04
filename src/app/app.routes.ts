import type { Routes } from "@angular/router";
import { DetailsPokemonComponent } from "./details-pokemon/details-pokemon.component";

export const routes: Routes = [
	{
		path: "pokemon/:name",
		component: DetailsPokemonComponent,
	},
];
