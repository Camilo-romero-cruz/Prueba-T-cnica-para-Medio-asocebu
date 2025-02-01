import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaApiComponent } from "./lista-api/lista-api.component";
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaApiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'To-Do-List';

}
