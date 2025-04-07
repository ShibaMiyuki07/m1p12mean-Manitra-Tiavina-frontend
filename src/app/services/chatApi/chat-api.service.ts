import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Chat} from "../../models/chat";

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {
  readonly url = environment.apiUrl;
  private readonly http: HttpClient = inject(HttpClient);
  constructor() { }

  addMessage(message: Chat) {
    this.http.post(`${this.url}/chats`, message).subscribe();
  }

  getAllMessages(discussionId:any) {
    return this.http.get<Array<Chat>>(`${this.url}/chats/discussions/${discussionId}`);
  }

}
