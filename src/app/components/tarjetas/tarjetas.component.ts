import { Component, Input, OnInit } from '@angular/core';
import{ Router }from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  @Input() items: any[]=[]

  constructor(private router:Router) { 
    console.log("TarjetasComponent")
  }

  ngOnInit(): void {
    
  }
  
  verArtista(item : any){
    let artistaID

    if(item.type==='artists'){
      artistaID=item.id
    }
    else{
      console.log(item.id)
      artistaID=item.artists[0].id;
    }
    
    this.router.navigate(['/artist',artistaID]);
  }

}
