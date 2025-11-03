import { useTodos } from "@/src/presentation/hooks/useTodos";
import { createStyles, defaultLightTheme, defaultDarkTheme } from "@/src/presentation/styles/todos.styles";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React, { useState, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";

import { useAuth } from "@/src/presentation/hooks/useAuth"; // NUEVO
import { useRouter } from "expo-router"; // NUEVO
import { Todo } from "@/src/domain/entities/Todo";

export default function TodosScreenClean() {
  const [inputText, setInputText] = useState("");
  const { todos, loading: todosLoading, addTodo, toggleTodo, deleteTodo } = useTodos();
  // NUEVAS LÍNEAS
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const loading = todosLoading || authLoading; // Loading combinado

  // NUEVA FUNCIÓN
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      router.replace("/(tabs)/login" as any);
    }
  };

  // 🎨 Detectar tema y crear estilos dinámicamente
  const colorScheme = useColorScheme();
  const styles = useMemo(
    () => createStyles(colorScheme === 'dark' ? defaultDarkTheme : defaultLightTheme),
    [colorScheme]
  );

  const handleAddTodo = async () => {
    if (!inputText.trim()) return;

    const success = await addTodo(inputText);
    if (success) {
      setInputText("");
    }
  };

  const handleConfirmDelete = (id: string) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar esta tarea?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => deleteTodo(id),
          style: "destructive"
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator
          size="large"
          color={colorScheme === 'dark' ? defaultDarkTheme.primary : defaultLightTheme.primary}
        />
        <Text style={styles.loadingText}>Cargando tareas...</Text>
      </View>
    );
  }

  const renderTodo = ({ item }: { item: any }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => toggleTodo(item.id)}
      >
        <View
          style={[styles.checkbox, item.completed && styles.checkboxChecked]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text
          style={[styles.todoText, item.completed && styles.todoTextCompleted]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleConfirmDelete(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* NUEVO HEADER CON INFO DE USUARIO */}
      <View style={styles.header}>

        {/* Botón de Perfil (Avatar y Nombre) */}
        <TouchableOpacity
          style={styles.profileButton} // Necesitas añadir este estilo
          onPress={() => router.push('/(tabs)/profile' as any)}
        >
          <View style={styles.userAvatarPlaceholder}>
            <Text style={styles.userAvatarText}>
              {user?.displayName?.charAt(0) || "U"}
            </Text>
          </View>
          <Text style={styles.userName} numberOfLines={1}>
            {user?.displayName || "Usuario"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Mis Tareas (Clean)</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Nueva tarea..."
          placeholderTextColor={colorScheme === 'dark' ? defaultDarkTheme.placeholder : defaultLightTheme.placeholder}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={renderTodo} // Asegúrate que renderTodo esté definido
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <Text style={styles.footer}>
        Total: {todos.length} | Completadas:{" "}
        {todos.filter((t) => t.completed).length}
      </Text>
    </View>
  );
}