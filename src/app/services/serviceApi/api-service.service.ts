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
}
