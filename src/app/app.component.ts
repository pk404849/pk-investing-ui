import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  imports: 
  [RouterOutlet, 
    HomeComponent,
  //AppRoutingModule,
    NgbModule,
    FormsModule,
   HttpClientModule
   ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pk-investing-ui';
}
