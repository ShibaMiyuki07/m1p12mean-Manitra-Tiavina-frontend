import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Discussion} from "../../models/discussion";

@Injectable({
  providedIn: 'root'
})
export class DiscussionApiService {
  private apiUrl = `${environment.apiUrl}/discussions`;
  private http: HttpClient = inject(HttpClient);

  createDiscussion(discussionData: Discussion) {
    this.http.post(`${this.apiUrl}/`, discussionData).subscribe();
  }

  getDiscussion(discussionData: Discussion) {
    return this.http.get<Array<Discussion>>(`${this.apiUrl}/users/${discussionData.receiverId}/${discussionData.senderId}`);
  }

  getAllDiscussions(userId : any) {
    return this.http.get<Array<Discussion>>(`${this.apiUrl}/all/${userId}`);
  }
}
