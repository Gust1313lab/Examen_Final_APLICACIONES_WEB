export enum EstadoTarea {
    PENDIENTE = 'pendiente',
    EN_PROGRESO = 'en_progreso',
    COMPLETADA = 'completada'
}

export interface TareaDTO {
    id?: number;
    titulo: string;
    descripcion?: string;
    estado: EstadoTarea;
    id_proyecto: number;
    fecha_vencimiento?: Date | string | null;
}

export interface TareasResponse {
    tareas: TareaDTO[];
}

export interface TareaPorIdResponse extends TareaDTO { }
