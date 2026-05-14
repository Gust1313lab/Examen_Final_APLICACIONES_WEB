import { Transaction } from "sequelize";
import { Usuario } from "../../infrastructure/models/UsuarioModels";

export interface UsuarioService {
    createUsuario(
        usuario: Usuario,
        tx?: Transaction
    ): Promise<Usuario>;

    getUsuarioById(
        id: number,
        tx?: Transaction
    ): Promise<Usuario | null>;

    getUsuarioByEmail(
        email: string,
        tx?: Transaction
    ): Promise<Usuario | null>;

    getAllUsuarios(
        tx?: Transaction
    ): Promise<Usuario[]>;

    updateUsuario(
        usuario: Usuario,
        tx?: Transaction
    ): Promise<Usuario | null>;

    deleteUsuario(
        id: number,
        tx?: Transaction
    ): Promise<boolean>;
}
