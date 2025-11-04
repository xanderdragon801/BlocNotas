import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../ui/theme';

export default function AppHeader({ title, right }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <View style={{flex:1}} />
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    backgroundColor: theme.colors.bg
  },
  title: { fontSize: 22, fontWeight: '700', color: theme.colors.text }
});
