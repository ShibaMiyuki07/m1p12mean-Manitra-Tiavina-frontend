import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-menubar-manager',
  standalone: true,
  imports: [],
  templateUrl: './menubar-manager.component.html',
  styleUrls: [
    '../../../assets/css/font_awesome_all.css',
    '../../../assets/css/flaticon.css',
    '../../../assets/css/icomoon.css',
    '../../../assets/css/bootstrap.css',
    '../../../assets/css/global.css',
    '../../../assets/css/element_css/header_upper.css',
    '../../../assets/css/element_css/header_lower.css',
    '../../../assets/css/style.css',
  ]
})
export class MenubarManagerComponent {
  username = localStorage.getItem('username');
  private authService: AuthService = inject(AuthService);

  logoff() {
    this.authService.logout();
  }
}
