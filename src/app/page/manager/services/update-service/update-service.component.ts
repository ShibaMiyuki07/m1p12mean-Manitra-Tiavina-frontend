import {Component, inject, OnInit} from '@angular/core';
import {MenubarManagerComponent} from "../../../../components/menubar-manager/menubar-manager.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiServiceService} from "../../../../services/serviceApi/api-service.service";
import {Service} from "../../../../models/Service";

@Component({
  selector: 'app-update-service',
  standalone: true,
  imports: [
    MenubarManagerComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './update-service.component.html',
  styleUrl: './update-service.component.css'
})
export class UpdateServiceComponent implements OnInit {
  private route : ActivatedRoute = inject(ActivatedRoute);
  id:any;
  private apiService : ApiServiceService = inject(ApiServiceService);
  service : Service = new class implements Service {
    _id: any;
    category: string = "";
    createdAt: any;
    description: string = "";
    duration: number = 0;
    image : string = "";
    name: string = "";
    price: Number = 0;
    updatedAt: any;
  };
  private readonly router: Router = inject(Router);

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.apiService.getServiceById(this.id).subscribe(service =>{
        this.service = service;
      })
    });
  }

  updateService(){
    this.apiService.updateService(this.service);
    this.router.navigate(['/manager/services']);
  }

}
