import { AuthRepository } from "../repositories/AuthRepository";
import { User } from "../entities/User";

export class UpdateProfile {
    constructor(private authRepository: AuthRepository) {}

    async execute(id: string, displayName: string): Promise<User> {
        // VALIDACIONES DE NEGOCIO
        if (!displayName || displayName.trim().length < 2) {
            throw new Error("El nombre debe tener al menos 2 caracteres");
        }

        return this.authRepository.updateProfile(id, displayName);
    }
}
