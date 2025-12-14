// screens/NoteEditorScreen.js
import React, { useState, useLayoutEffect, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { createNote, updateNote, deleteNote } from '../api/client';

export default function NoteEditorScreen({ route, navigation }) {
  const note = route?.params?.note;

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [contentHeight, setContentHeight] = useState(120);

  const originalTitle = useRef(title);
  const originalContent = useRef(content);

  const isEditing = Boolean(note?._id);

  // =====================
  // GUARDAR CAMBIOS MANUAL (SOLO EDITAR)
  // =====================
  const saveChanges = async () => {
    try {
      await updateNote(note._id, { title, content });
      Toast.show({
        type: 'success',
        text1: 'Cambios guardados',
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'No se pudo guardar',
      });
    }
  };

  // =====================
  // AUTOGUARDADO AL SALIR (NOTA NUEVA)
  // =====================
  const autoSaveIfNew = async () => {
    if (isEditing) return;
    if (content.trim() === '') return;

    try {
      await createNote({ title, content });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'No se pudo guardar',
      });
    }
  };

  // =====================
  // HEADER CON ÍCONOS
  // =====================
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={24}
          color="#111827"
          style={{ marginLeft: 16 }}
          onPress={async () => {
            await autoSaveIfNew();
            navigation.goBack();
          }}
        />
      ),

      headerRight: () => (
        <View style={styles.headerIcons}>
          {/* GUARDAR SOLO SI YA EXISTE */}
          {isEditing && (
            <TouchableOpacity onPress={saveChanges}>
              <Ionicons name="save-outline" size={24} color="#16a34a" />
            </TouchableOpacity>
          )}

          {/* ELIMINAR */}
          {isEditing && (
            <TouchableOpacity
              onPress={() =>
                Alert.alert('Eliminar nota', '¿Eliminar esta nota?', [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                      await deleteNote(note._id);
                      Toast.show({
                        type: 'error',
                        text1: 'Nota eliminada',
                      });
                      navigation.goBack();
                    },
                  },
                ])
              }
            >
              <Ionicons name="trash-outline" size={24} color="#dc2626" />
            </TouchableOpacity>
          )}
        </View>
      ),
    });
  }, [navigation, title, content]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.container}>
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.title}
            placeholderTextColor="#9ca3af"
          />

          <TextInput
            placeholder="Escribe tu nota..."
            value={content}
            onChangeText={setContent}
            multiline
            onContentSizeChange={(e) =>
              setContentHeight(e.nativeEvent.contentSize.height)
            }
            style={[
              styles.content,
              { height: Math.max(120, contentHeight) },
            ]}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
    marginBottom: 12,
    color: '#111827',
  },
  content: {
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#111827',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
    marginRight: 12,
  },
});
