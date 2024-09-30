import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Snackbar, Text, TextInput } from 'react-native-paper'
import { style } from '../../../theme/style'
import { View } from 'react-native'
import { auth, database } from '../../../firebaseConfig'
import { push, ref, set } from 'firebase/database'
// Intreface - Proops (Propiedades de un componente padre a un hijo)
interface Props {
    showModalProduct: Boolean,
    setShowModalProduct: Function // funcionde hook useState
}
//Interface - FormProduct
interface FormProduct {
    code: string,
    nameProduct: string,
    price: number,
    stock: number
    description: string,
}
interface ShowMessage {
    visible: boolean,
    message: string,
    color: string
}
export const NewPorductComponent = ({ showModalProduct, setShowModalProduct }: Props) => {
    //Hook - Agregar productos
    const [formProduct, setFormProduct] = useState<FormProduct>({
        code: '',
        nameProduct: '',
        price: 0,
        stock: 0,
        description: ''
    })

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: "",
        color: "#fff"
    })

    //funcion para actualizar el estado del formulario
    const handleSetValues = (key: string, value: string) => {
        setFormProduct({ ...formProduct, [key]: value });
    }
    //Funcion agregar - guardar productos
    const handleSaveProduct = async () => {
        if (!formProduct.code || !formProduct.nameProduct || !formProduct.price || !formProduct.stock || !formProduct.description) {
            setShowMessage({
                visible: true,
                message: 'Completa todos los campos',
                color: '#fe0000'
            })
            return;
        }
        //console.log(formProduct);
        // 1 crear la referencia aa la bdd
        const dbRef = ref(database, 'products/' + auth.currentUser?.uid   )
        //2 crear una coleccion que agrege los datos en dbref
        const saveProduct = push(dbRef)
        //3. Almacenar los datos
        try {
            await set(saveProduct, formProduct)
            //cerrar el modal
            setShowModalProduct(false)
        } catch (error) {
            console.log(error);
            setShowMessage({
                visible: true,
                message: 'No se completo la transaccion ',
                color: '#fe0000'
            })

        }
    }
    return (

        <>
            <Portal>
                <Modal visible={showModalProduct} contentContainerStyle={style.modal}>
                    <View style={style.Header}>
                        <Text variant='headlineSmall' style={{textAlign:'center'}}>Ingresa un nuevo helado</Text>
                        <View style={style.icon}>
                            <IconButton icon='close-outline'
                                size={30}
                                onPress={() => setShowModalProduct(false)} />
                        </View>
                    </View>
                    <Divider />
                    <TextInput
                        label='Código'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('code', value)}
                    />
                    <TextInput
                        label='Nombre'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('nameProduct', value)}
                    />
                    <View style={style.rootInputsProducts}>
                        <TextInput
                            label='Precio'
                            mode='outlined'
                            keyboardType='numeric'
                            onChangeText={(value) => handleSetValues('price', value)}
                            style={{ width: '45%' }}
                        /><TextInput
                            label='Stock'
                            mode='outlined'
                            keyboardType='numeric'
                            onChangeText={(value) => handleSetValues('stock', value)}
                            style={{ width: '45%' }}
                        />
                    </View>
                    <TextInput
                        label='description / sabor'
                        mode='outlined'
                        onChangeText={(value) => handleSetValues('description', value)}
                        multiline
                        numberOfLines={3}
                    />
                    <Button mode='contained' onPress={handleSaveProduct}>Agregar</Button>
                </Modal>
                <Snackbar
                    visible={showMessage.visible}
                    onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
                    style={{
                        ...style.message,
                        backgroundColor: showMessage.color
                    }}>
                    {showMessage.message}
                </Snackbar>
            </Portal>
        </>
    )
}