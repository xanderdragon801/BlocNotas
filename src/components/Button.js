import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../ui/theme';

export default function Button({ label, tone='primary', onPress, style }) {
  const bg = tone === 'primary' ? theme.colors.primary
           : tone === 'secondary' ? theme.colors.secondary
           : theme.colors.danger;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, {backgroundColor: bg}, style]}>
      <Text style={styles.txt}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { padding: theme.spacing(1.5), borderRadius: theme.radius.md, alignItems: 'center' },
  txt: { color: '#FFF', fontWeight: '600' }
});
