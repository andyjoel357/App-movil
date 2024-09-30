import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { style } from "../../theme/style";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Product } from "./HomeScreen";
import { ref, remove, update } from "firebase/database";
import { auth, database } from "../../firebaseConfig";
import { signOut } from "firebase/auth";

export const DetailProductScreen = () => {
    //Hook useRoot ; acceder a toda la informacion  de navegacion
    const route = useRoute();
    //@ts-ignore
    const { product } = route.params;
    //hook para la navegacion

    const navigation = useNavigation()
    // hook para cambiar el estado del formulario
    const [formEdit, setFormEdit] = useState<Product>({
        id: '',
        code: '',
        nameProduct: '',
        price: 0,
        stock: 0,
        description: '',
    });

    //hool useEfect: cargar y mostrar los datos en el formulario detalle
    useEffect(() => {
        //atualizar los datos en el formulario
        setFormEdit(product);
    }, []);
    // funcion para actulizar los datos capturados desde el formulario
    const handleSetValues = (key: string, value: string) => {
        setFormEdit({ ...formEdit, [key]: value })
    }
    //funcion para actualizar la data
    const handleUpdateProduct = async () => {
        //rreferenciar al id para editar 
        const dbRef = ref(database, 'products/'+ auth.currentUser?.uid + '/' + formEdit.id)
        try {
            // Acrualizar la data
            await update(dbRef, {
                code: formEdit.code,
                nameProduct: formEdit.nameProduct,
                price: formEdit.price,
                stock: formEdit.stock,
                description: formEdit.description
            })
            //regresar al anterior screen 
            navigation.goBack();
        } catch (error) {
            console.log(error);

        }
    }

    //Funcion para eliminar
    const  handleDeleteProduct = async ()=>{
        const dbRef = ref(database, 'products/' + formEdit.id)
        try {
            await remove(dbRef);
            navigation.goBack()
        } catch (error) {
            console.log(error);
            
        }
    } 

    return (
        <>
            <ScrollView style={style.rootDetail}>
                <Text variant="headlineSmall">Codigo:</Text>
                <TextInput
                    value={formEdit.code}
                    onChangeText={(value) => handleSetValues('code', value)}
                />
                <Divider />

                <View>
                    <Text style={style.textDetail}>Nombre</Text>
                    <TextInput
                        value={formEdit.nameProduct}
                        onChangeText={(value) => handleSetValues('nameProduct', value)} />

                    <Divider />
                </View>
                <View style={style.rootInputsProducts}>
                    <Text style={style.textDetail}>Precio: </Text>
                    <TextInput
                        value={formEdit.price.toString()}
                        onChangeText={(value) => handleSetValues('price', value)}
                        keyboardType='numeric'
                        style={{ width: '28%' }} />

                    <Text style={style.textDetail}>Stock: </Text>
                    <TextInput
                        value={formEdit.stock.toString()}
                        onChangeText={(value) => handleSetValues('stock', value)}
                        keyboardType='numeric'
                        style={{ width: '28%' }} />
                </View>
                <View>
                    <Text variant="labelLarge">Descripcion</Text>
                    <TextInput
                        value={formEdit.description}
                        onChangeText={(value) => handleSetValues('description', value)}
                        multiline
                        numberOfLines={3}
                    />
                </View>
                <Button
                    mode="outlined"
                    icon='update'
                    onPress={handleUpdateProduct}>Actualizar</Button>

                <Button
                    mode="outlined"
                    icon='delete-empty-outline'
                    onPress={handleDeleteProduct}>Eliminar</Button>

            </ScrollView>
        </>
    )
}