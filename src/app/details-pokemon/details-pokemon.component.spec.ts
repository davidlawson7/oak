import { type ComponentFixture, TestBed } from "@angular/core/testing";

import { DetailsPokemonComponent } from "./details-pokemon.component";

describe("DetailsPokemonComponent", () => {
	let component: DetailsPokemonComponent;
	let fixture: ComponentFixture<DetailsPokemonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DetailsPokemonComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DetailsPokemonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
