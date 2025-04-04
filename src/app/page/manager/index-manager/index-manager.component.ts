import { Component } from '@angular/core';
import {BackofficeItemComponent} from "../../../components/backoffice-item/backoffice-item.component";
import {MenubarManagerComponent} from "../../../components/menubar-manager/menubar-manager.component";
import {FooterComponent} from "../../../components/footer/footer.component";

@Component({
  selector: 'app-index-manager',
  standalone: true,
    imports: [
        BackofficeItemComponent,
        MenubarManagerComponent,
        FooterComponent
    ],
  templateUrl: './index-manager.component.html',
  styleUrls:[
    './index-manager.component.css',
    '../../../../assets/css/font_awesome_all.css',
  ]
})
export class IndexManagerComponent {

}
