import { NgFor, NgIf } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	type OnInit,
	Renderer2,
	inject,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";
import { patchState } from "@ngrx/signals";
import { primaryNavigation } from "./config/navigation";
import { PokemonStore } from "./core/state/pokemon.store";

@Component({
	selector: "oak-root",
	standalone: true,
	imports: [RouterLink, RouterOutlet, NgFor, NgIf, ReactiveFormsModule],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	title = "oak";

	darkModeActive = true;

	primaryNavigation = primaryNavigation;

	readonly renderer = inject(Renderer2);
	readonly pokemonStore = inject(PokemonStore);

	filter = new FormControl("");

	ngOnInit(): void {
		this.filter.valueChanges.subscribe((queryString) => {
			if (queryString)
				patchState(this.pokemonStore, {
					filter: { ...this.pokemonStore.filter(), query: queryString },
				});
		});

		this.changeTheme(this.darkModeActive);
	}

	toggleDarkMode(darkModeActive: boolean): void {
		this.changeTheme(darkModeActive);
		this.darkModeActive = !this.darkModeActive;
	}

	private changeTheme(darkModeActive: boolean): void {
		const htmlEl = document.querySelector("html");

		const classToAdd = darkModeActive ? "oak-dark-mode" : "oak-light-mode";
		const classToRemove = darkModeActive ? "oak-light-mode" : "oak-dark-mode";

		this.renderer.addClass(htmlEl, classToAdd);
		this.renderer.removeClass(htmlEl, classToRemove);
	}
}
