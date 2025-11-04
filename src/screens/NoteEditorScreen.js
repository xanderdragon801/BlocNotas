import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { createNote, updateNote, deleteNote } from '../api/client';

export default function NoteEditorScreen({ route, navigation }) {
  const note = route?.params?.note;
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const isEditing = Boolean(note?._id);

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateNote(note._id, { title, content });
      } else {
        await createNote({ title, content });
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar la nota');
    }
  };

  const handleDelete = async () => {
    if (!isEditing) return;
    Alert.alert('Eliminar', '¿Eliminar esta nota?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteNote(note._id);
            navigation.goBack();
          } catch (e) {
            Alert.alert('Error', 'No se pudo eliminar la nota');
          }
        },
      },
    ]);
  };

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
          placeholderTextColor="#9ca3af"
        />

        <TextInput
          placeholder="Escribe tu nota..."
          value={content}
          onChangeText={setContent}
          style={styles.content}
          multiline
          placeholderTextColor="#9ca3af"
        />

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.btn, styles.primary]} onPress={handleSave}>
            <Text style={styles.btnText}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.secondary]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnText}>Regresar</Text>
          </TouchableOpacity>

          {isEditing && (
            <TouchableOpacity style={[styles.btn, styles.danger]} onPress={handleDelete}>
              <Text style={styles.btnText}>Eliminar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
    marginBottom: 12,
    color: '#111827',
  },
  content: { flex: 1, textAlignVertical: 'top', fontSize: 16, color: '#111827' },
  actions: { flexDirection: 'row', gap: 8, justifyContent: 'space-between', marginTop: 16 },
  btn: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center' },
  primary: { backgroundColor: '#111827' },
  secondary: { backgroundColor: '#374151' },
  danger: { backgroundColor: '#b91c1c' },
  btnText: { color: '#fff', fontWeight: '600' },
});
