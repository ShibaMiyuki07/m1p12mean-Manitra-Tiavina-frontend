import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  readonly url = environment.apiUrl;
  private readonly http: HttpClient = inject(HttpClient);
  constructor() { }

  uploadProductImage(pictureProduct:File | null) {
    if (pictureProduct) {
      const image = new FormData();
      image.append("product", pictureProduct);
      this.http.post(`${this.url}/utils/image/products`, image).subscribe(() => {});
    }
  }
}
