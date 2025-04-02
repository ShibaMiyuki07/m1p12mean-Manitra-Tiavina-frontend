import { Component } from '@angular/core';
import {MenubarMechanicComponent} from "../../components/menubar-mechanic/menubar-mechanic.component";
import {NgForOf} from "@angular/common";
import {AutosizeModule} from "ngx-autosize";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MenubarMechanicComponent,
    NgForOf,
    AutosizeModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messageList : any = 30;
}
