import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {MenubarMechanicComponent} from "../../components/menubar-mechanic/menubar-mechanic.component";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
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
    NgOptimizedImage,
    AsyncPipe
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
  messageInterval : any;



  async ngOnInit() {
    this.chat.senderId = this.senderId;
    this.discussions = await this.discussionApiService.getAllDiscussions(this.senderId).toPromise();

    if(this.discussions && this.discussions.length > 0) {
      //make the last discussion selected
      this.discussions[this.discussions.length-1].isSelected = true;
      this.lastDiscussion = this.discussions[this.discussions.length-1];

      //get the discussionId of the last discussion
      this.chat.discussionId = this.lastDiscussion._id;
      if(this.lastDiscussion.receiverId === this.senderId && this.lastDiscussion.lastMessage && this.lastDiscussion.lastMessage.unread)
      {
        this.lastDiscussion.lastMessage.unread = false;
        this.chatApi.updateMessage(this.lastDiscussion.lastMessage);
      }

      //retrieve all the message of the last discussion
      this.messageInterval = this.reloadDiscussions(this.lastDiscussion._id);
      this.chat.receiverId = this.lastDiscussion.receiverId;
      if(this.lastDiscussion.senderId !== this.senderId) {
        this.chat.receiverId = this.lastDiscussion.senderId;
      }
    }
  }

  reloadDiscussions (discussionId:any) {
    return setInterval(async () =>{
      this.messages = await this.chatApi.getAllMessages(discussionId).toPromise();
    },1000);
  }

  send()
  {
    if(!this.isNewDiscussion)
    {
      this.chatApi.addMessage(this.chat);
      this.chat.content = "";
    }
  }

  async selectDiscussion(discussionId : any)
  {
    clearInterval(this.messageInterval);
    let selectedDiscussion : Discussion | undefined;
    if(this.isNewDiscussion)
    {
      if(this.discussions)
      {
        this.discussions.pop();
      }
    }
    this.isNewDiscussion = false;
    if(this.discussions)
    {
      if(this.discussions.find(discussion => discussion._id !== discussionId))
      {
        this.discussions.find(discussion => discussion._id !== discussionId)!.isSelected = false;
      }
      selectedDiscussion = this.discussions.find(discussion => discussion._id == discussionId);
      this.discussions.find(discussion => discussion._id == discussionId)!.isSelected = true;
      this.messageInterval = this.reloadDiscussions(selectedDiscussion!._id);

      //initialize chat data
      this.chat.discussionId = discussionId;
      this.chat.unread = true;

      if(selectedDiscussion!.senderId !== this.senderId)
      {
        this.chat.receiverId = selectedDiscussion!.receiverId;
      }
      else{
        this.chat.receiverId = selectedDiscussion!.senderId;
      }
    }
  }

  openNewDiscussion(){
    clearInterval(this.messageInterval);
    if(!this.isNewDiscussion)
    {
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

}
