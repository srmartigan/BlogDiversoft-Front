import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: string = 'http://localhost/api/post';

  constructor(private http: HttpClient) { }

  //Obtener todos los posts de la API via observable
  getPosts(): Observable<any> {
    return this.http.get(this.url);
  }

  //Obtener un post de la API via observable
  getPost(id: string): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }
}


