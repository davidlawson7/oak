import {
	type ApplicationConfig,
	provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { routes } from "./app.routes";
import { loggingInterceptor } from "./core/interceptors/logging.interceptor";

export const appConfig: ApplicationConfig = {
	providers: [
		provideExperimentalZonelessChangeDetection(),
		provideHttpClient(withInterceptors([loggingInterceptor])),
		provideRouter(routes),
	],
};
