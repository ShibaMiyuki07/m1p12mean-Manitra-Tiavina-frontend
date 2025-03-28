import { Component } from '@angular/core';
import {BackofficeItemComponent} from "../../../components/backoffice-item/backoffice-item.component";
import {MenubarMechanicComponent} from "../../../components/menubar-mechanic/menubar-mechanic.component";

@Component({
  selector: 'app-index-manager',
  standalone: true,
  imports: [
    MenubarMechanicComponent,
    BackofficeItemComponent
  ],
  templateUrl: './index-manager.component.html',
  styleUrls:[
    './index-manager.component.css',
    '../../../../assets/css/font_awesome_all.css',
  ]
})
export class IndexManagerComponent {

}
