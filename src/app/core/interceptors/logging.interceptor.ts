import type {
	HttpEvent,
	HttpHandlerFn,
	HttpRequest,
} from "@angular/common/http";
import type { Observable } from "rxjs";

export function loggingInterceptor(
	req: HttpRequest<unknown>,
	next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
	//   return indexDB.hasLoaded().pipe(
	//     switchMap(loaded => !loaded ? next(req) : indexDB.getDB().pipe(mergeMap(db => {
	//         const response = db.get(req.url)
	//         response.
	//     })))
	//   )
	return next(req);

	//   return from(caches.open("poke-api-v2")).pipe(
	//     switchMap((cache) =>
	//       from(cache.match(req.url)).pipe(
	//         mergeMap((matchResponse) => {
	//           if (matchResponse) {
	//             return of(matchResponse as any as HttpEvent<unknown>);
	//           }
	//           return next(req).pipe(
	//             tap((res) => {
	//               if (res.type === HttpEventType.Response) {
	//                 cache.put(req.url, structuredClone(res.body) as any as Response);
	//               }
	//             }),
	//           );
	//         }),
	//       ),
	//     ),
	//   );
}
