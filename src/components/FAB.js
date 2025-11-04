import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../ui/theme';

export default function FAB({ onPress }) {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.plus}>＋</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute', right: theme.spacing(2), bottom: theme.spacing(3),
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center',
    ...theme.shadow.card
  },
  plus: { color: '#FFF', fontSize: 28, lineHeight: 28, marginTop: 2 }
});
