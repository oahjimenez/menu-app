import { Component, Input } from '@angular/core';
import { Area } from '../area';

@Component({
  selector: 'app-area-detail',
  imports: [],
  templateUrl: './area-detail.component.html',
  styleUrl: './area-detail.component.scss'
})
export class AreaDetailComponent {

  @Input() area!: Area | undefined;

}
