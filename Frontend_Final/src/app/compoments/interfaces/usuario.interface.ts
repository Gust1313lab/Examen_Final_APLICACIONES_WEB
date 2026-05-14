// ============ USUARIO DTO ============
export interface UsuarioDTO {
    id?: number;
    nombre: string;
    email: string;
    contraseña: string;
    fecha_registro?: Date;
}
