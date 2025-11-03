import { container } from "@/src/di/container";
import { Todo } from "@/src/domain/entities/Todo";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "./useAuth";

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // 🟢 MODIFICADO: obtener user Y loading del useAuth
    const { user, loading: authLoading } = useAuth(); 

  const loadTodos = useCallback(async () => {

    // 🛑 NUEVO: Bloquear si Auth aún está cargando
    if (authLoading) return;

    // Bloquear si NO hay usuario (esto ya lo tenías)
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      // 🛑 MODIFICACIÓN 1: El resto del código de carga no cambia
      const result = await container.getAllTodos.execute(user.id);
      setTodos(result);
    } catch (err) {
      // const message = err instanceof Error ? err.message : "Error desconocido al cargar tareas";
      // setError(message);
      // Alert.alert("Error de Carga", message);
    } finally {
      setLoading(false);
    }
  }, [user, authLoading]); // 🛑 MODIFICACIÓN 2: Añadir authLoading a las dependencias

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = async (title: string): Promise<boolean> => {
    // 🛑 NUEVO: Bloquear si Auth aún está cargando o no hay usuario
    if (authLoading || !user) {
      Alert.alert("Error", "Debes iniciar sesión para agregar tareas");
      return false;
    }

    // ... el resto de tu lógica de addTodo ...
    // Tu código de addTodo aquí
    try {
      const newTodo = await container.createTodo.execute({ title, userId: user.id });
      setTodos([newTodo, ...todos]);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al agregar tarea";
      Alert.alert("Error", message);
      return false;
    }
  };

  const toggleTodo = async (id: string): Promise<void> => {
    try {
      const updatedTodo = await container.toggleTodo.execute(id);
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));

    } catch (err) {
      Alert.alert("Error", "No se pudo actualizar la tarea");
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await container.deleteTodo.execute(id);
      setTodos(todos.filter((t) => t.id !== id));

    } catch (err) {
      Alert.alert("Error", "No se pudo eliminar la tarea");
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refresh: loadTodos,
  };
};