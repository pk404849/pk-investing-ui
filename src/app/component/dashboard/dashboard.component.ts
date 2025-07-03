import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private router: Router, 
    private location: Location
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

  openInNewTab(path: string) {
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}${this.location.prepareExternalUrl(path)}`;
  window.open(fullUrl, '_blank');
}
}
