import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LoginModel } from '../../model/login-model';
import { CommonService } from '../../service/common.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private commonService: CommonService,
    private router: Router
  ) {

  }

  loginModel = new LoginModel();
  login(): void {
    
    this.commonService.login(this.loginModel).subscribe((res) => {
      if (res.status && res.data != null) {
        console.log('result => ',res.data)
        localStorage.setItem('userInfo',JSON.stringify(res.data));
        localStorage.setItem('userId',res.data.userId);
        localStorage.setItem('id',res.data.id);
        alert('Login was successfull.....');
        this.router.navigate(['/dashboard']);
      }
    });


  }
}
