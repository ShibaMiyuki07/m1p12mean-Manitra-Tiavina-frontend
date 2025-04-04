import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Service} from "../../models/Service";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  readonly url = environment.apiUrl;
  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  getAllServices()
  {
    return this.http.get<Array<Service>>(`${this.url}/services`);
  }

  createService(service: Service)
  {
    this.http.post(`${this.url}/services`, service).subscribe();
  }

  deleteService(serviceId: any) {
    this.http.delete(`${this.url}/services/${serviceId}`).subscribe(() => {});
  }

  getServiceById(serviceId: any) {
    return this.http.get<Service>(`${this.url}/services/${serviceId}`);
  }

  updateService(service: Service) {
    this.http.put(`${this.url}/services/${service._id}`,
      {
        name : service.name,
        description : service.description,
        price : service.price,
        category : service.category,
        duration : service.duration,
        createdAt : service.createdAt,
        updatedAt : new Date()

      }).subscribe(val => {
        console.log("PUT call successful value returned in body",
          val);
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The PUT observable is now completed.");
      });
  }
}
