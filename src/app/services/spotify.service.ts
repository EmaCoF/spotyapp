import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders}from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Data } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class SpotifyService {
  constructor(private http:HttpClient) {
    console.log("Spotify Service is Ready")

  }


  GetToken(){
    return "Bearer "+"BQAR1KqJGvITB3TKZ7kE79HbejLYJkEcV-svqbhv1niUl935K0cxvnOEaR1QPvjsjsBh5pgft8ROMsTWRz9Fg01naFJvJtTJQ0E9OSTm6PVD0xCulQr7PeRDdjMjJlPx1KoC4vKUvkCM9gofe0WUDfqsWF4bR059O02jCYRe0dytgoq9g4HJWw1faEZhUtfCczI"
  }


  GetQuery(query:string):any;
  GetQuery(query:string, headers:HttpHeaders):any;
  
  
  GetQuery(query:string, headersOver?:HttpHeaders){
    const url=`https://api.spotify.com/v1/${query}`;
    if (query && headersOver) {
      return this.http.get(url,{headers:headersOver});
    }
    else{
      const headers = new HttpHeaders({'Authorization':this.GetToken()});

      return this.http.get(url,{headers:headers});
    }
    
  }

  


  getRealeases(){
    return this.GetQuery(`browse/new-releases?limit=15`)
  }

  getArtists(termino:string){
    return this.GetQuery(`search?q=${ termino }&type=artist&market=ES&limit=10&offset=5`)
  }

  getArtista(id:string){
    return this.GetQuery(`artists/${ id }`);
  }


 //GettopTracks Tarea
  
  getArtistTop(id:string){
    return this.GetQuery(`artists/${ id }/top-tracks?market=ES`);
  }

  getTop(){
    const headers = new HttpHeaders({'Authorization':this.GetToken(), 'fields':'tracks'});

    return this.GetQuery(`playlists/37i9dQZEVXbMDoHDwVN2tF`,headers)
  }
 

}
