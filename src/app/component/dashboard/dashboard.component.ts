import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private router: Router
  ) {

  }
  userInfo: any;
  ngOnInit(): void {
    const stored = localStorage.getItem('userInfo');
    this.userInfo = stored ? JSON.parse(stored) : {};
    console.log('userInfo => ', this.userInfo);
  }
  userLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
