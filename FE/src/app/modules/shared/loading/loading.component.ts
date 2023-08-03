import { Component, Input } from '@angular/core';
import { Size } from 'ngx-spinner';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  @Input('bdColor') bdColor: string = '';
  @Input('size') size: Size = 'small';
  @Input('color') color: string = '';
  @Input('type') type: string = '';
  @Input('fullScreen') fullScreen: boolean = false;
}
