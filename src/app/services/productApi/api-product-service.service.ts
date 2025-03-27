import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiProductServiceService {
  readonly url = environment.apiUrl;
  constructor() { }
}
