import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { HomeComponent } from './component/home/home.component';
import { CommonService } from './service/common.service';

// import { FormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  imports: 
  [RouterOutlet, 
    //CommonService,
   // HomeComponent,
  //AppRoutingModule,
   // NgbModule,
   // FormsModule,
  // HttpClientModule
   ],
  // providers: [CommonService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pk-investing-ui';
}
