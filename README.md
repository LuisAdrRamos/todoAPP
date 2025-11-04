# 📚 TodoApp: Clean Architecture y Firebase Authentication

Este proyecto es una aplicación móvil universal de lista de tareas (`TodoApp`) desarrollada con **React Native** y **Expo Router**. Su objetivo principal fue implementar y demostrar una arquitectura limpia (Clean Architecture) y un sistema robusto de autenticación y gestión de datos utilizando **Firebase Firestore** y **Firebase Authentication**.

---

## 🛠️ Arquitectura y Tecnologías Clave

### 🏗️ Clean Architecture (Arquitectura Limpia)

El proyecto está dividido en capas con el principio de Inversión de Dependencias (Domain/Data/Presentation):

1.  **Domain (`src/domain/`):** Contiene la lógica de negocio pura (Use Cases), las entidades (`Todo.ts`, `User.ts`), y los contratos (Interfaces de Repositorio). Es completamente independiente de React o Firebase.
2.  **Data (`src/data/`):** Implementa los contratos del Dominio, comunicándose directamente con servicios externos (Data Sources).
3.  **Presentation (`app/`, `src/presentation/`):** Contiene la interfaz de usuario (Screens) y el manejo de estado (`useAuth.ts`, `useTodos.ts`), que interactúa solo con los Use Cases.

### ⚙️ Stack Tecnológico

| Componente | Uso |
| :--- | :--- |
| **Framework** | React Native / Expo |
| **Enrutamiento** | Expo Router (File-based routing) |
| **Base de Datos** | Firebase Firestore (NoSQL) |
| **Autenticación** | Firebase Authentication (Email/Password) |
| **Patrón** | Dependency Injection (DIContainer) |
| **Lenguaje** | TypeScript |

---

## ✅ Retos Obligatorios Completados

La aplicación implementa un sistema de gestión de usuarios y tareas con seguridad a nivel de servidor (Security Rules).

### 1. Persistencia de Sesión

* **Funcionalidad:** El usuario permanece logueado incluso si la aplicación se cierra por completo (implementado forzando la persistencia nativa con `initializeAuth` y `AsyncStorage`).

### 2. Gestión y Actualización de Perfiles

* **Funcionalidad:** Implementación de **`profile.tsx`** para actualizar el nombre (`displayName`). El cambio se actualiza en **Firebase Auth** y en **Firestore Database** (`users` collection).

### 3. Validación de Email y Errores

* **Validación:** El *Use Case* `RegisterUser.ts` valida el formato del email usando **Regex**.
* **Manejo de Errores:** El *Data Source* captura errores específicos de Firebase (ej., `auth/email-already-in-use`) y lanza un error amigable.

### 4. Recuperación de Contraseña

* **Flujo Completo:** La pantalla **`forgot-password.tsx`** utiliza la función `sendPasswordResetEmail` de Firebase Auth para enviar el enlace de recuperación.

### 5. Confirmación antes de Eliminar

* **Seguridad UI:** Implementación de una alerta nativa (`Alert.alert`) que solicita la confirmación antes de eliminar una tarea.

---

## 🚀 Guía de Inicio

### Configuración

1.  **Clonar el repositorio.**
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Configurar Firebase:**
    * Asegúrese de que el archivo `.env` en la raíz contenga las claves de Firebase con el prefijo `EXPO_PUBLIC_` para la carga de *runtime*.
    * Verifique que las **Reglas de Firestore** estén configuradas correctamente.
    * Verifique que el **Índice Compuesto** (`todos` collection, `userId` Ascendente, `createdAt` Descendente) esté habilitado.

### Ejecución

1.  **Iniciar la Aplicación:** (El `--clear` es crucial para cargar variables de entorno y limpiar cachés)
    ```bash
    npx expo start --clear
    ```
2.  **Prueba Nativa:** Abrir en Expo Go o en un emulador Android/iOS.
    * La app debe redirigir inmediatamente a `/login`.
```eof