import { Component } from '@angular/core';
import { faBox, faBoxes, faCoffee, faWarehouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mevios-erp';
  faBox = faBox;
  faBox2 = faBoxes;
  faWarehouse = faWarehouse;
}
