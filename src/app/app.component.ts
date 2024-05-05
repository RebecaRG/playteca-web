import { Component } from '@angular/core';
import { SpinnerComponent } from './shared/spinner.component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, SpinnerComponent, HttpClientModule]
})
export class AppComponent {
  title = 'app';
}
