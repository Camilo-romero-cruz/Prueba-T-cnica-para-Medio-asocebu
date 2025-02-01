import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private apiUrl = 'https://www.apitodolist.somee.com';

  constructor(private http: HttpClient) {}

  ObtenerTareas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/MostrarTareas`);
  }

  EliminarTarea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/EliminarTarea?id=${id}`, {
      responseType: 'text',
    });
  }

  GuardarTarea(tarea: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Guardar`, tarea, {
      responseType: 'text',
    });
  }

  ActualizarTarea(
    id: number,
    nombre: string,
    descripcion: string,
    estadoCompletada: boolean
  ): Observable<any> {
    const tareaActualizada = {
      idTarea: id,
      nombre: nombre,
      descripcion: descripcion,
      completada: estadoCompletada,
    };

    return this.http.put(`${this.apiUrl}/ActualizarTarea`, tareaActualizada, {
      responseType: 'text',
    });
  }
}
