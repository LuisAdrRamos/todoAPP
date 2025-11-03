import { AuthRepository } from "../repositories/AuthRepository";

export class ForgotPassword {
    constructor(private authRepository: AuthRepository) { }

    async execute(email: string): Promise<void> {
        // Validación de formato de email 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("El formato del email no es válido");
        }

        // Llama al repositorio para enviar el email
        return this.authRepository.forgotPassword(email);
    }
}