import { Transaction } from "sequelize";
import { UsuarioService } from "../../domain/services/UsuarioService";
import { Usuario } from "../models/UsuarioModels";

export class UsuarioServiceImpl implements UsuarioService {
    async createUsuario(
        usuario: Usuario,
        tx?: Transaction
    ): Promise<Usuario> {
        return await Usuario.create({
            nombre: usuario.nombre,
            email: usuario.email,
            contraseña: usuario.contraseña,
            fecha_registro: usuario.fecha_registro
        },
        { transaction: tx }
        ).then(createdUsuario => {
            console.log("Usuario creado exitosamente");
            return createdUsuario;
        })
        .catch(error => { throw new Error(`Error al crear usuario: ${error}`) })
        .finally(() => { console.log("createUsuario finalizado") });
    }

    async getUsuarioById(id: number, tx?: Transaction): Promise<Usuario | null> {
        return await Usuario.findByPk(id, { transaction: tx })
            .then(usuario => usuario || null)
            .catch(error => { throw new Error(`Error al obtener usuario: ${error}`) })
            .finally(() => { console.log("getUsuarioById finalizado") });
    }

    async getUsuarioByEmail(email: string, tx?: Transaction): Promise<Usuario | null> {
        return await Usuario.findOne({
            where: { email },
            transaction: tx
        })
            .then(usuario => usuario || null)
            .catch(error => { throw new Error(`Error al obtener usuario por email: ${error}`) })
            .finally(() => { console.log("getUsuarioByEmail finalizado") });
    }

    async getAllUsuarios(tx?: Transaction): Promise<Usuario[]> {
        return await Usuario.findAll({ transaction: tx })
            .then(usuarios => usuarios)
            .catch(error => { throw new Error(`Error al obtener usuarios: ${error}`) })
            .finally(() => { console.log("getAllUsuarios finalizado") });
    }

    async updateUsuario(
        usuario: Usuario,
        tx?: Transaction
    ): Promise<Usuario | null> {
        return await Usuario.update({
            nombre: usuario.nombre,
            email: usuario.email,
            contraseña: usuario.contraseña,
            fecha_registro: usuario.fecha_registro
        },
        { where: { id: usuario.id }, transaction: tx }
        ).then(async () => {
            const usuarioActualizado = await Usuario.findByPk(usuario.id, { transaction: tx });
            console.log("Usuario actualizado exitosamente");
            return usuarioActualizado;
        })
        .catch(error => { throw new Error(`Error al actualizar usuario: ${error}`) })
        .finally(() => { console.log("updateUsuario finalizado") });
    }

    async deleteUsuario(id: number, tx?: Transaction): Promise<boolean> {
        return await Usuario.destroy({
            where: { id },
            transaction: tx
        })
            .then(resultado => resultado > 0)
            .catch(error => { throw new Error(`Error al eliminar usuario: ${error}`) })
            .finally(() => { console.log("deleteUsuario finalizado") });
    }
}
