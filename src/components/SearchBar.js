import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { theme } from '../ui/theme';

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.box}>
      <TextInput
        placeholder="Buscar nota..."
        placeholderTextColor={theme.colors.subtext}
        value={value}
        onChangeText={onChange}
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: theme.colors.card,
    marginHorizontal: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  input: { padding: theme.spacing(1.5), color: theme.colors.text, fontSize: 16 }
});
