import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInteceptor implements HttpInterceptor{

    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        req.clone(
            {
                setHeaders: {
                    'X-RapidAPI-Key': '6b00fcfa55msha63e2993569451cp187fa0jsn83e3538b7f22',
                    'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
                },
                setParams : {
                    key: 'a6efab855a964f1ca103391495e66f2f'
                }
            }
        );
        
        return next.handle(req);
    }
}