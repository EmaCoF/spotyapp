import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artista:any={};
  topTracks:any={};
  loadingArtist=false;
  sanitizer:any;

  constructor(private router:ActivatedRoute, private spotify:SpotifyService, sanitizer:DomSanitizer) {

    this.spotify.GetTokenProm().then(token=>{
      
      this.sanitizer = sanitizer;
      this.router.params.subscribe(params=>{
        this.getArtista(params['id']);
        this.getTopTracks(params['id']);
        
      });
      this.loadingArtist=true
    })
   }

  ngOnInit(): void {
  }

  getArtista(id:string){
    
    this.spotify.getArtista(id).subscribe(
      (artista: any)=>{
        console.log(artista);
        this.artista=artista
      }
    )
    
  }
  getTopTracks(id:string){
    this.spotify.getArtistTop(id).subscribe(
      (topTracks: any) =>{
      
      this.topTracks=topTracks.tracks
      console.log(this.topTracks);
      
      this.loadingArtist=false
    })
  }

  EmbedURL(url:string) {
    console.log(url)
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
