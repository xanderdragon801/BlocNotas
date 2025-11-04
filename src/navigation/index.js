import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NotesListScreen from '../screens/NotesListScreen';
import NoteEditorScreen from '../screens/NoteEditorScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Notas" component={NotesListScreen} />
        <Stack.Screen name="EditarNota" component={NoteEditorScreen} options={{ title: 'Editar nota' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
