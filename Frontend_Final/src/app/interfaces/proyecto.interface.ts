export interface ProyectoDTO {
    id?: number;
    nombre: string;
    descripcion?: string;
    fecha_limite?: Date | string | null;
}

export interface ProyectosResponse {
    proyectos: ProyectoDTO[];
}

export interface ProyectoPorIdResponse extends ProyectoDTO { }
