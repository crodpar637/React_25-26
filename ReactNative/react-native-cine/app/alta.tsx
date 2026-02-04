import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import api from '../src/services/api';

export default function AltaDirector() {
  // Estado para el formulario basado en tu JSON de la API
  const [form, setForm] = useState({
    name: '',
    birth_date: '',
    biography: '',
    photo_url: ''
  });

  const [loading, setLoading] = useState(false);

  // Helper para mostrar alert con fallback en web
  const showAlert = (title: string, message?: string) => {
    if (Platform.OS === 'web') {
      // window.alert funciona en la web (Expo web)
      window.alert(title + (message ? '\n\n' + message : ''));
    } else {
      Alert.alert(title, message);
    }
  };

  // Función para enviar los datos
  const handleSave = async () => {
    console.log('[AltaDirector] handleSave called — form:', form);
    // Validación simple
    if (!form.name || !form.birth_date) {
      showAlert('Error', 'Por favor, rellena al menos el nombre y la fecha.');
      return;
    }

    setLoading(true);
    try {
      // Usamos el endpoint para el alta
      await api.post('/directors', form);
      
      showAlert('Éxito', 'Director guardado correctamente');
      
      // Limpiar formulario tras éxito
      setForm({ name: '', birth_date: '', biography: '', photo_url: '' });
    } catch (error: any) {
      // El interceptor que creamos antes manejará el log,
      // aquí mostramos el error en consola y al usuario.
      console.error('[AltaDirector] save error:', error);
      showAlert('Error', error?.mensaje || 'No se pudo guardar el director');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Nuevo Director</Text>
      
      <TextInput
        label="Nombre Completo"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        mode="outlined"
        style={styles.input}
        placeholder="Ej: John Ford"
      />

      <TextInput
        label="Fecha de Nacimiento (AAAA-MM-DD)"
        value={form.birth_date}
        onChangeText={(text) => setForm({ ...form, birth_date: text })}
        mode="outlined"
        style={styles.input}
        placeholder="1880-12-12"
      />

      <TextInput
        label="URL de la Foto"
        value={form.photo_url}
        onChangeText={(text) => setForm({ ...form, photo_url: text })}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Biografía"
        value={form.biography}
        onChangeText={(text) => setForm({ ...form, biography: text })}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <Button 
        mode="contained" 
        onPress={handleSave} 
        loading={loading}
        disabled={loading}
        icon="content-save"
        style={styles.button}
      >
        Guardar Director
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
});