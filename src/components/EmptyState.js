import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../ui/theme';

export default function EmptyState({ title="No hay notas", subtitle="Crea tu primera nota con el botón ＋" }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.illu}><Text style={styles.icon}>📝</Text></View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:{ alignItems:'center', marginTop: theme.spacing(8), paddingHorizontal: theme.spacing(3) },
  illu:{ width:96, height:96, borderRadius:48, backgroundColor:'#fff', alignItems:'center', justifyContent:'center', ...theme.shadow.card },
  icon:{ fontSize:40 },
  title:{ marginTop: theme.spacing(2), fontSize:18, fontWeight:'700', color:theme.colors.text },
  sub:{ marginTop: theme.spacing(1), fontSize:14, color:theme.colors.subtext, textAlign:'center' }
});
