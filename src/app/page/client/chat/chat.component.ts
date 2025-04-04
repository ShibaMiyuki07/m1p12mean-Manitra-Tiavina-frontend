import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {MenubarMechanicComponent} from "../../../components/menubar-mechanic/menubar-mechanic.component";
import {NgForOf, NgIf} from "@angular/common";
import {AutosizeModule} from "ngx-autosize";
import {ChatApiService} from "../../../services/chatApi/chat-api.service";
import {Chat} from "../../../models/chat";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Discussion} from "../../../models/discussion";
import {DiscussionApiService} from "../../../services/discussionApi/discussion-api.service";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MenubarMechanicComponent,
    NgForOf,
    AutosizeModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  chatApi : ChatApiService = inject(ChatApiService);
  authService : AuthService = inject(AuthService);
  senderId : any = this.authService.getUserId();
  discussions : Discussion[] | undefined = [];
  messages : Chat[] | undefined = [];
  discussionApiService : DiscussionApiService = inject(DiscussionApiService);
  isNewDiscussion : boolean = false ;
  username : string = "";

  chat : Chat = new class implements Chat {
    discussionId: any;
    _id: any;
    content: string = "";
    senderId: any;
    receiverId: any;
  }
  @ViewChild('children') children : ElementRef | null = null;




  async ngOnInit() {
    this.chat.senderId = this.senderId;
    this.chat.receiverId = "65f8e8b1e4b1a2b3c4d5e6f1";
    this.discussions = await this.discussionApiService.getAllDiscussions(this.senderId).toPromise();
    this.messages = await this.chatApi.getAllMessages(this.chat.senderId,this.chat.receiverId ).toPromise();
  }

  send()
  {
    this.chatApi.addMessage(this.chat);
  }

  openNewDiscussion(){
    this.isNewDiscussion = true;
    if(this.children)
    {
      this.children.nativeElement.focus();
    }
    this.discussions?.push(
      {
        _id: undefined,
        receiver: undefined,
        receiverId: undefined,
        sender: undefined,
        senderId: undefined,
        text : "New Message",
        isSelected : true

      }
    )
  }

}
