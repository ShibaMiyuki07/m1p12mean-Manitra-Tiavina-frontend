import { Component } from '@angular/core';
import {MenubarMechanicComponent} from "../../components/menubar-mechanic/menubar-mechanic.component";
import {Constant} from "../../models/Constant";

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
  todayDate : Date = new Date();


  nextDate()
  {
    this.todayDate.setDate(this.todayDate.getDate() + 1);
  }

  prevDate()
  {
    this.todayDate.setDate(this.todayDate.getDate() - 1);
  }

  displayDate()
  {
    return this.todayDate.getDate() + ' ' + this.Constant.monthNames[this.todayDate.getMonth()] + ' ' + this.todayDate.getFullYear();
  }

  protected readonly Constant = new Constant();
}
