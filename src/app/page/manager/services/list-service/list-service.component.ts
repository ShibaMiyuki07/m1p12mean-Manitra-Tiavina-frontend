import {Component, inject, OnInit} from '@angular/core';
import {MenubarManagerComponent} from "../../../../components/menubar-manager/menubar-manager.component";
import {ApiServiceService} from "../../../../services/serviceApi/api-service.service";
import {Service} from "../../../../models/Service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-list-service',
  standalone: true,
  imports: [
    MenubarManagerComponent,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.css'
})
export class ListServiceComponent implements OnInit {
  private readonly apiService : ApiServiceService = inject(ApiServiceService);
  services : Service[] = [];

  ngOnInit() {
    this.apiService.getAllServices().subscribe(services => this.services = services);

  }


}
