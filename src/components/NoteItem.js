import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { theme } from '../ui/theme';

export default function NoteItem({ note, onPress, onLongPress }) {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>{note.title || 'Sin título'}</Text>
      <Text style={styles.content} numberOfLines={2}>{note.content || 'Sin contenido'}</Text>
      <View style={styles.meta}>
        <Text style={styles.date}>{new Date(note.updatedAt).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card, borderRadius: theme.radius.md,
    padding: theme.spacing(2), marginBottom: theme.spacing(1.5),
    borderWidth: 1, borderColor: theme.colors.border, ...theme.shadow.card
  },
  title: { fontWeight:'700', fontSize:16, color: theme.colors.text, marginBottom: 6 },
  content: { color: theme.colors.subtext },
  meta: { marginTop: 8 },
  date: { fontSize: 12, color: theme.colors.subtext }
});
