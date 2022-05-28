import { Injectable, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders}from '@angular/common/http'
import { buffer, map } from 'rxjs/operators';
import { Data } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class SpotifyService {
  constructor(private http:HttpClient) {
    console.log("Spotify Service is Ready")

  };
  
  token:string | undefined;
  
  

  GetTokenProm():Promise<any>{
    const clientID='6555a53d29a44d5f859606d49984a488';
    const clientSecret='73f98f5f7e194834bc0eb72e6c2dad45';
    const url='https://accounts.spotify.com/api/token';

    let body = new URLSearchParams();
    body.set('grant_type', 'client_credentials')

    let headers = new HttpHeaders().set('Authorization','Basic '+btoa(clientID+':'+ clientSecret)).set('Content-Type','application/x-www-form-urlencoded');
    
    
    
    return this.http.post<any>(url,body,{headers:headers}).toPromise().then((data)=>{
      this.token=data.access_token
    }).catch();
  
  }

  GetToken(){
    return  'Bearer '+this.token;
  }


  GetQuery(query:string):any;
  GetQuery(query:string, headers:HttpHeaders):any;
  
  
  GetQuery(query:string, headersOver?:HttpHeaders){
    
    const url=`https://api.spotify.com/v1/${query}`;
    if (query && headersOver) {
      return this.http.get(url,{headers:headersOver});
    }
    else{
      let headers = new HttpHeaders({'Authorization':this.GetToken()});
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
