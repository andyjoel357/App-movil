import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper";
import { style } from "../../../theme/style";
import firebase from '@firebase/auth';
import { updateProfile } from 'firebase/auth';
import { auth } from "../../../firebaseConfig";
interface props {
    showModalProfile: Boolean,
    setShowModalProfile: Function,
}
interface FormUser {
    name: string;
}

export const EditProfileComponent = ({ showModalProfile, setShowModalProfile, }: props) => {
    const [FormUser, setFormUser] = useState<FormUser>({
        name: "",
    });
    const handleSetValues = (key: string, value: string) => {
        setFormUser({ ...FormUser, [key]: value })
    }
    const [userData, setUserData] = useState<firebase.User | null>(null)
    const handleUpdateUser = async () => {
        try {
            await updateProfile(userData!, { displayName: FormUser.name, })
        } catch (e) {
            console.log(e);
        }
        //ocultar modal
        setShowModalProfile(false);
    }
    useEffect(() => {
        setUserData(auth.currentUser);
        setFormUser({ name: auth.currentUser?.displayName ?? '' })
    }, [])
    return (

        <>
            <View>
                <Portal>
                    <Modal visible={showModalProfile} contentContainerStyle={style.modal}>
                        <View style={style.Header}>
                            <Text variant="headlineSmall">Editar perfil</Text>
                            <View style={style.icon}>
                                <IconButton
                                    icon="close-outline"
                                    size={20}
                                    onPress={() => setShowModalProfile(false)}
                                />
                            </View>
                        </View>
                        <TextInput
                            mode='outlined'
                            label='Nombre'
                            value={FormUser.name}
                            onChangeText={(value) => handleSetValues('name', value)}
                        />
                        <TextInput
                            mode='outlined'
                            label='Correo'
                            disabled
                            value={userData?.email!}
                        />
                        <Button mode='outlined' onPress={handleUpdateUser}>Actualizar</Button>
                    </Modal>
                </Portal>
            </View>
        </>
    )
}