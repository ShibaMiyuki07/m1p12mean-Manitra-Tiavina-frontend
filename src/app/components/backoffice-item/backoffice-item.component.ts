import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-backoffice-item',
  standalone: true,
  imports: [],
  templateUrl: './backoffice-item.component.html',
  styleUrl: './backoffice-item.component.css'
})
export class BackofficeItemComponent {
  @Input() name: string = "";
  @Input() icon: string = "";
  @Input() link: string = "";
}
