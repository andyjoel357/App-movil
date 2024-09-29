import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Avatar, Button, FAB, Icon, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper";
import { style } from "../../theme/style";
import { auth } from "../../firebaseConfig";
import firebase from '@firebase/auth'
import { updateProfile } from "firebase/auth";
import { ProductCardComponent } from "./Components/ProductCardComponent";
import { NewPorductComponent } from "./Components/NewProductComponent";


//Interfaz: Informacion del usuario  FormUser
interface FormUser {
    name: string;
    phoneNumber?: string;
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
        name: "",
        phoneNumber: ""
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
    const [showModalProfile, setShowModalProfile] = useState<Boolean>(false)

    //hook useState para ver y ocultar el modal de agregar
    const [showModalProduct, setShowModalProduct] = useState<Boolean>(false)

    //Funcion para actualizar la informacion del usuario autenticado
    const handleUpdateUser = async () => {
        try {
            await updateProfile(userData!, { displayName: FormUser.name, })
            //ocultar modal
            setShowModalProfile(false);
            console.log(userData);

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
                    <Icon size={50} source= "ice-cream"/>
                    <View>
                        <Text variant="bodySmall">Bienvenido</Text>
                        <Text variant="labelLarge">{userData?.displayName}</Text>
                    </View>
                    <View style={style.icon}>
                        <IconButton
                            icon="ice-pop"
                            size={30}
                            mode="contained"
                            onPress={() => setShowModalProfile(true)}
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
            <FAB
                icon="keyboard-variant"
                style={style.fab}
                onPress={() => setShowModalProduct(true)}
            />
            <NewPorductComponent showModalProduct={showModalProduct} setShowModalProduct={setShowModalProduct} />
        </>
    )
}