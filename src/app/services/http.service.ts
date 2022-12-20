import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment as env } from 'src/environments/environment.prod';
import { APIResponse, Game } from 'src/app/models'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  addKey :string = '?key=a6efab855a964f1ca103391495e66f2f';

  constructor(private http: HttpClient) { }

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {

    let params = new HttpParams().set('ordering', ordering);

    if(search){
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}${this.addKey}`, {
        params: params
      });
  }

  getGameDetails(id: string) : Observable<Game> {

    const gameInfoRequest = this.http.get<Game>(`${env.BASE_URL}/${id}${this.addKey}`);
    const gameScreenshotsRequest = this.http.get<Game>(`${env.BASE_URL}/${id}/screenshots${this.addKey}`);
    const gameTrailersRequest = this.http.get<Game>(`${env.BASE_URL}/${id}/movies${this.addKey}`);

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }

}
