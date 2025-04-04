import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalendarModule, DateAdapter} from "angular-calendar";
import {AppModules} from "./app.modules";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Garazy';
}
