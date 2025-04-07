import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {MenubarMechanicComponent} from "../../components/menubar-mechanic/menubar-mechanic.component";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {AutosizeModule} from "ngx-autosize";
import {ChatApiService} from "../../services/chatApi/chat-api.service";
import {Chat} from "../../models/chat";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Discussion} from "../../models/discussion";
import {DiscussionApiService} from "../../services/discussionApi/discussion-api.service";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MenubarMechanicComponent,
    NgForOf,
    AutosizeModule,
    FormsModule,
    NgIf,
    NgOptimizedImage
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
    unread : boolean = true;
  }
  @ViewChild('children') children : ElementRef | null = null;

  lastDiscussion : Discussion | undefined;



  async ngOnInit() {
    this.chat.senderId = this.senderId;
    this.discussions = await this.discussionApiService.getAllDiscussions(this.senderId).toPromise();
    if(this.discussions && this.discussions.length > 0) {
      this.discussions[this.discussions.length-1].isSelected = true;
      this.lastDiscussion = this.discussions[this.discussions.length-1];
      this.messages = await this.chatApi.getAllMessages(this.discussions[this.discussions.length-1]._id).toPromise();
      this.chat.receiverId = this.discussions[this.discussions.length-1].receiverId;
      if(this.discussions[this.discussions.length-1].senderId !== this.senderId) {
        this.chat.receiverId = this.discussions[this.discussions.length-1].senderId;
      }
    }
  }

  send()
  {
    if(!this.isNewDiscussion)
    {
      this.chatApi.addMessage(this.chat);
    }
  }

  selectDiscussion(i:number)
  {
    this.discussions?.forEach((discussion:Discussion)=>{
      discussion.isSelected = false;
    });
    if(this.discussions)
    {
      this.discussions[i].isSelected = true;
    }
  }

  openNewDiscussion(){
    this.isNewDiscussion = true;
    this.discussions?.forEach((discussion) => {
      discussion.isSelected = false;
    });
    this.messages = [];
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
        isSelected : true,
        lastMessage : undefined
      }
    )
  }

}
