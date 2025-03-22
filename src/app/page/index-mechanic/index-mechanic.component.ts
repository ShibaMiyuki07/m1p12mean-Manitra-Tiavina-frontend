import { Component } from '@angular/core';
import {MenubarMechanicComponent} from "../../components/menubar-mechanic/menubar-mechanic.component";

@Component({
  selector: 'app-index-mechanic',
  standalone: true,
  imports: [
    MenubarMechanicComponent
  ],
  templateUrl: './index-mechanic.component.html',
  styleUrl: './index-mechanic.component.css'
})
export class IndexMechanicComponent {

}
