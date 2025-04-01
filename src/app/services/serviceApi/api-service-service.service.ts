import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UnassignedReservation} from "../../models/apiResult/unassignedReservation";
import {Service} from "../../models/Service";
import {map, Observable} from "rxjs";
import {GroupedServices} from "../../models/apiResult/GroupedServices";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceServiceService {
  readonly url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllServices() {
    return this.http.get<Array<Service>>(`${this.url}/services/`);
  }

  getServiceById(serviceId: any) {
    return this.http.get<Service>(`${this.url}/services/${serviceId}`);
  }

  createService(service: Service) {
    this.http.post(`${this.url}/services`, service).subscribe();
  }


  updateService(service: Service) {
    this.http.put(`${this.url}/services/${service._id}`,
      {
        name : service.name,
        description : service.description,
        price : service.price,
        category : service.category,
        duration : service.duration,
        image : service.image,
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

  deleteService(serviceId: any) {
    this.http.delete(`${this.url}/services/${serviceId}`).subscribe(val => {});
  }

  getServicesGroupedByCategory(): Observable<GroupedServices[]> {
    return this.http.get<{data: GroupedServices[]}>(`${this.url}/services/grouped/category`)
      .pipe(map(response => response.data));
  }
}
