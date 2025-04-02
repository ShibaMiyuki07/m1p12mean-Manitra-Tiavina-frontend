import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MenubarManagerComponent} from "../../../../components/menubar-manager/menubar-manager.component";
import {Service} from "../../../../models/Service";
import {ApiServiceService} from "../../../../services/serviceApi/api-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-service',
  standalone: true,
  imports: [
    FormsModule,
    MenubarManagerComponent
  ],
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.css'
})
export class CreateServiceComponent {
  service : Service = new class implements Service {
    _id: any;
    category: string = "";
    createdAt: any;
    description: string = "";
    duration: Number = 0;
    image : string = "";
    name: string = "";
    price: Number = 0;
    updatedAt: any;
  };

  apiService : ApiServiceService = inject(ApiServiceService);
  router: Router = inject(Router);

  createService()
  {
    this.apiService.createService(this.service);
    //this.router.navigate(['/manager/services']);
  }
}
