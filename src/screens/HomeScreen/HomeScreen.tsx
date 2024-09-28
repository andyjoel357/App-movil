import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Avatar, Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper";
import { style } from "../../theme/style";
import { auth } from "../../firebaseConfig";
import firebase from '@firebase/auth'
import { updateProfile } from "firebase/auth";
import { ProductCardComponent } from "./Components/ProductCardComponent";
import ModalProfileComponent from "./Components/ModalComponent";

//Interfaz: Informacion del usuario  FormUser
interface FormUser {
    name: string;
}
//interface para los productos 
interface Product {
    id: string,
    code: string,
    nameProduct: string,
    price: number,
    stock: number
    description: string,
}

export const HomeScreen = () => {
    //Crear un hook- UseState: Cambiar el estado del formulario
    const [FormUser, setFormUser] = useState<FormUser>({
        name: ""
    });

    //Hook: capturar y modificar la data del usuario
    const [userData, setUserData] = useState<firebase.User | null>(null)

    //hook useState: gestionar la lista de productos a mostrar
    const [products, setproducts] = useState<Product[]>([
        {
            id: '01',
            code: '483453945',
            nameProduct: 'Teclado',
            price: 35, stock: 10,
            description: 'Teclado mecanico rgb'
        },
        {
            id: '02',
            code: '4378578345',
            nameProduct: 'Mouse',
            price: 30, stock: 15,
            description: 'Mouse 3434 rgb gaming'
        }
    ])


    //hook useState: permitir que el modal se visualize o no 
    const [showModal, setShowModal] = useState<Boolean>(false)
    //Funcion para actualizar la informacion del usuario autenticado
    const handleUpdateUser = async () => {
        try {
            await updateProfile(userData!, { displayName: FormUser.name })
            //ocultar modal
            setShowModal(false);
        } catch (e) {
            console.log(e);

        }
    }
    //Funcion para actualizar el estado del formulario
    const handleSetValues = (key: string, value: string) => {
        setFormUser({ ...FormUser, [key]: value })
    }

    //hook UseEffect : validar la autenticacion
    useEffect(() => {
        setUserData(auth.currentUser); //Obtener el usuario Logeado
        setFormUser({ name: auth.currentUser?.displayName ?? '' })

    }, [])

    return (
        <>
            <View style={style.rootHome}>
                <View style={style.Header}>
                    <Avatar.Text size={50} label="PN" />
                    <View>
                        <Text variant="bodySmall">Bienvenido</Text>
                        <Text variant="labelLarge">{userData?.displayName}</Text>
                    </View>
                    <View style={style.icon}>
                        <IconButton
                            icon="account-edit"
                            size={30}
                            mode="contained"
                            onPress={() => setShowModal(true)}
                        />
                    </View>
                </View>
                <View>
                    <FlatList
                        data={products}
                        renderItem={({ item }) => <ProductCardComponent />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            <ModalProfileComponent
                visible={showModal}
                onClose={() => setShowModal(false)}
                onUpdateUser={handleUpdateUser}
                formUser={FormUser}
                userData={userData}
                handleSetValues={handleSetValues}
            />
        </>
    )
}