import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { SignUpModel } from '../../model/sign-up-model';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, CommonModule,ReactiveFormsModule, RouterLink ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

 

  constructor(
    private commonService : CommonService) 
    {
   
  }

   signUpModel =new SignUpModel();
  signUp(){
    console.log(this.signUpModel);
    this.commonService.signUp(this.signUpModel).subscribe((res) => {
       if (res.status && res.message != '') {
        alert(res.message);

       }
    });
  }
}
