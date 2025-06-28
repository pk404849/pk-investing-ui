import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-profile',
  imports: [RouterLink, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

   constructor(
    private commonService : CommonService,
    private router: Router
  ) 
    {   
  }
ngOnInit(): void {
  this.findUserByUserId();
}
  userInfo:any;
  findUserByUserId(){
     if (typeof window !== 'undefined' && window.localStorage) {
    var id = localStorage.getItem("id");
    var userId = localStorage.getItem("userId");
     if (id && userId) {
    this.commonService.findUserByUserId(id, userId).subscribe((res)=>{
      if(res.status && res.data){
        this.userInfo = res.data
        //console.log('userInfo => ',this.userInfo);
      }
    });
     }
  }
}
}
