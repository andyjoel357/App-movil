import React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, IconButton } from 'react-native-paper';
import { style } from '../../../theme/style';
import firebase from '@firebase/auth'


interface Props {
  visible: boolean;
  onClose: () => void;
  onUpdateUser: () => void;
  formUser: { name: string };
  userData: firebase.User | null;
  handleSetValues: (key: string, value: string) => void;
}

const ModalProfileComponent: React.FC<Props> = ({
  visible,
  onClose,
  onUpdateUser,
  formUser,
  userData,
  handleSetValues,
}) => {
  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={style.modalProfile}>
        <View style={style.Header}>
          <Text variant="headlineSmall">Mi perfil</Text>
          <View style={style.icon}>
            <IconButton
              icon="close-circle-outline"
              size={20}
              onPress={onClose}
            />
          </View>
        </View>
        <TextInput
          mode='outlined'
          label='Nombre'
          value={formUser.name}
          onChangeText={(value) => handleSetValues('name', value)}
        />
        <TextInput
          mode='outlined'
          label='Correo'
          disabled
          value={userData?.email!}
        />
        <Button mode='contained' onPress={onUpdateUser}>Actualizar</Button>
      </Modal>
    </Portal>
  );
};

export default ModalProfileComponent;