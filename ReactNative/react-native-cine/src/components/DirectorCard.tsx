import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, Avatar, IconButton, Button } from 'react-native-paper';

interface DirectorProps {
  id_director: number;
  name: string;
  biography: string;
  photo_url: string;
  onDelete: (id: number) => void;
}

export function DirectorCard({ id_director, name, biography, photo_url, onDelete }: DirectorProps) {
  return (
    <Card style={styles.card} mode="elevated">
      {/* Cabecera con Avatar e Icono de Borrado */}
      <Card.Title
        title={name}
        titleVariant="titleLarge"
        subtitle="Director de Cine"
        left={(props) => (
          <Avatar.Image 
            {...props} 
            source={{ 
              uri: photo_url 
            }} 
          />
        )}
        right={(props) => (
          <IconButton 
            {...props} 
            icon="delete-outline" 
            iconColor="#B00020" 
            onPress={() => onDelete(id_director)} 
          />
        )}
      />

      <Card.Content style={styles.content}>
        <Text variant="bodyMedium" numberOfLines={3} style={styles.bio}>
          {biography || "Sin biografía disponible."}
        </Text>
      </Card.Content>

      {/* Acciones adicionales (Opcional: Ver detalle o Editar) */}
      <Card.Actions>
        <Button mode="text" onPress={() => console.log('Ver más no hace nada', id_director)}>
          Ver más
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 8,
  },
  bio: {
    color: '#444',
    lineHeight: 20,
  }
});