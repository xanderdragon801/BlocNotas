// screens/NoteEditorScreen.js
import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { createNote, updateNote, deleteNote } from '../api/client';

export default function NoteEditorScreen({ route, navigation }) {
  const note = route?.params?.note;

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const isEditing = Boolean(note?._id);
  // 💾 GUARDAR CAMBIOS MANUAL
const handleSaveChanges = async () => {
  try {
    await updateNote(note._id, { title, content });
    Toast.show({
      type: 'success',
      text1: 'Cambios guardados',
    });
  } catch (e) {
    Toast.show({
      type: 'error',
      text1: 'Error al guardar',
    });
  }
};

  // 🔑 ESCUCHAR ALTURA DEL TECLADO (ESTO ES LA CLAVE)
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  // HEADER simple tipo Notas
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={24}
          color="#111827"   // negro
          style={{ marginLeft: 16 }}
      
          onPress={async () => {
            if (!isEditing && content.trim() !== '') {
              await createNote({ title, content });
            }
            navigation.goBack();
          }}
        />
      ),
      headerRight: () =>
        isEditing ? (
          <View style={{ flexDirection: 'row', gap: 18, marginRight: 16 }}>
      
            {/* 💾 GUARDAR CAMBIOS */}
            <Ionicons
              name="save-outline"
              size={24}
              color="#22c55e"
              onPress={handleSaveChanges}
            />
      
            {/* 🗑 ELIMINAR */}
            <Ionicons
              name="trash-outline"
              size={24}
              color="#ef4444"
              onPress={() =>
                Alert.alert('Eliminar nota', '¿Eliminar esta nota?', [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                      await deleteNote(note._id);
                      navigation.goBack();
                    },
                  },
                ])
              }
            />
      
          </View>
        ) : null,
      
    });
  }, [navigation, title, content, handleSaveChanges]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
          style={styles.title}
          placeholderTextColor="#aaa"
        />

        <TextInput
          placeholder="Escribe tu nota..."
          value={content}
          onChangeText={setContent}
          multiline
          scrollEnabled
          style={[
            styles.editor,
            { paddingBottom: keyboardHeight + 24 }, // 🔥 AQUÍ ESTÁ EL SECRETO
          ]}
          placeholderTextColor="#aaa"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',   // blanco
    padding: 16,
  },
  title: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // gris claro
    paddingVertical: 8,
    marginBottom: 12,
    color: '#111827',             // texto oscuro
  },
  editor: {
    flex: 1,
    fontSize: 16,
    color: '#111827',             // texto oscuro
    textAlignVertical: 'top',
  },
});
