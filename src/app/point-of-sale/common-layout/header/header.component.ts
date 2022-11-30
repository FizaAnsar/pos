import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public navbarCollapsed = true;
  constructor(private user:ApiService,private  router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.user.deleteUser();
    this.router.navigate(['signin'])
  }

}
