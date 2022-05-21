import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading:boolean;

  error:boolean;
  NuevasCanciones:any[]=[]
  mensajeError:string=''

  constructor(private spotify:SpotifyService) {
    this.loading=true
    this.error=false

    this.spotify.getRealeases()
    .subscribe((data:any)=>{
      this.NuevasCanciones=data.albums.items;
      this.loading=false
      console.log("this.spotify.getrealeases")
      console.log(data.albums.items)
    },(errorServicio:any)=>{
      this.loading=false;
      this.error=true;
      console.log(errorServicio)
      this.mensajeError
    });
   }

  ngOnInit(): void {
  }

}
