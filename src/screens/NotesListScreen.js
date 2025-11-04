import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { fetchNotes, deleteNote } from '../api/client';

export default function NotesListScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchNotes();
      // Asegura un array
      setNotes(Array.isArray(data) ? data : []);
    } catch (e) {
      Alert.alert('Error', 'No se pudieron cargar las notas');
    } finally {
      setLoading(false);
    }
  }, []);

  // Recarga cada vez que la pantalla gana foco
  useEffect(() => {
    const unsub = navigation.addListener('focus', load);
    return unsub;
  }, [navigation, load]);

  const handleDelete = (note) => {
    Alert.alert('Eliminar', '¿Deseas eliminar esta nota?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteNote(note._id);
            await load();
          } catch (e) {
            Alert.alert('Error', 'No se pudo eliminar la nota');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EditarNota', { note: item })}
      onLongPress={() => handleDelete(item)}
    >
      <Text style={styles.title} numberOfLines={1}>
        {item?.title || 'Sin título'}
      </Text>
      <Text style={styles.content} numberOfLines={2}>
        {item?.content || 'Sin contenido'}
      </Text>
      <Text style={styles.date}>
        {item?.updatedAt ? new Date(item.updatedAt).toLocaleString() : ''}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item, idx) => String(item?._id || idx)}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={load} />
        }
        contentContainerStyle={{ padding: 16, paddingBottom: 96 }}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.empty}>No hay notas. Crea una nueva.</Text>
          )
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('EditarNota')}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: { fontWeight: '700', fontSize: 16, marginBottom: 6, color: '#111827' },
  content: { color: '#4b5563' },
  date: { marginTop: 8, fontSize: 12, color: '#9ca3af' },
  empty: { textAlign: 'center', marginTop: 40, color: '#6b7280' },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    backgroundColor: '#111827',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: { color: '#fff', fontSize: 30, lineHeight: 30 },
});
