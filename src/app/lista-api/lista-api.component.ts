import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { TareasService } from '../Tareas.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-lista-api',
  standalone: true,
  imports: [FormsModule, CommonModule], // Añade CommonModule aquí
  templateUrl: './lista-api.component.html',
  styleUrl: './lista-api.component.css',
})
export class ListaApiComponent {
  Tareas: any[] = [];
  nuevaTarea: { nombre: string, descripcion: string } = { nombre: '', descripcion: '' };

  constructor(private TareasService: TareasService) {}

  ngOnInit() {
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.TareasService.ObtenerTareas().subscribe(
      (datos) => {
        this.Tareas = datos.map((tarea) => ({
          ...tarea,
          mostrarDescripcion: false,
          completada: tarea.completada === null ? false : tarea.completada
        }));
      },
      (error) => console.error('Error al obtener tareas:', error)
    );
  }

  toggleDescripcion(idTarea: number) {
    const tarea = this.Tareas.find((t) => t.idTarea === idTarea);
    if (tarea) {
      tarea.mostrarDescripcion = !tarea.mostrarDescripcion;
    }
  }

  eliminarTarea(id: number) {
    this.TareasService.EliminarTarea(id).subscribe(
      () => {
        this.obtenerTareas();
      },
      (error) => console.error('Error al eliminar tarea:', error)
    );
  }

  agregarTarea() {
    if (this.nuevaTarea.nombre.trim() && this.nuevaTarea.descripcion.trim()) {
      const tarea = { 
        idTarea: 0, 
        nombre: this.nuevaTarea.nombre, 
        descripcion: this.nuevaTarea.descripcion 
      };
      this.TareasService.GuardarTarea(tarea).subscribe(
        (datos) => {
          this.obtenerTareas();
          this.nuevaTarea = { nombre: '', descripcion: '' };
        },
        (error) => console.error('Error al guardar tarea:', error)
      );
    } else {
      console.error('Nombre o descripción vacíos');
    }
  }

  actualizarEstadoTarea(id: number, nombre: string, descripcion: string, estadoActual: boolean) {
    const estadoCompletada = estadoActual != null ? estadoActual : false;
    this.TareasService.ActualizarTarea(id, nombre, descripcion, estadoCompletada).subscribe(
      () => {
        this.obtenerTareas();
      },
      (error) => console.error("Error al actualizar tarea:", error)
    );
  }
}

