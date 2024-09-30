import React, { useState } from "react";
import { View } from "react-native";
import { style } from "../theme/style";
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";
interface FormLogin {
    email: String,
    password: String
}
interface ShowMessage {
    visible: boolean,
    message: string,
    color: string
}
export const LoginScreen = () => {
    // Funcion para cambiar el estado del fomulario
    const [FormLogin, setFormLogin] = useState<FormLogin>({
        email: "",
        password: ""
    });

    const [showMessage, setShowMessage] = useState<ShowMessage>({
        visible: false,
        message: "",
        color: "#fff"
    })
    //Hock para la navegacion de un screen a otro -> useNavigation 
    const navigation = useNavigation();


    // handle set
    const handleSetValues = (key: string, value: string) => {
        setFormLogin({ ...FormLogin, [key]: value });
    }

    const [hiddenPassword, setHiddenPassword] = useState<Boolean>(true);

    //Funcion para inisiar secion

    const handleSingIn = async () => {
        if (!FormLogin.email || !FormLogin.password) {
            setShowMessage({
                visible: true,
                message: "Completa todos los campos!",
                color: "#fe0000"
            });
            return;
        }
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                //@ts-ignore
                FormLogin.email,
                FormLogin.password
            );
            navigation.dispatch(CommonActions.navigate({name:'Home'}))
        } catch (e) {
            console.log(e);
            setShowMessage({
                visible: true,
                message: 'Correo y/o contraseña incorrecta',
                color: '#fe0000'
            })
        }
    }

    return (
        <View style={style.root}>
            <Text style={style.text}>Iniciar Sesión</Text>
            <TextInput
                label="Correo"
                mode="outlined"
                placeholder="Ecribe tu correo"
                onChangeText={(value) => handleSetValues('email', value)}
            />
            <TextInput
                label="Password"
                mode="outlined"
                placeholder="Ecribe tu contraseña"
                //@ts-ignore
                secureTextEntry={hiddenPassword}
                onChangeText={(value) => handleSetValues('password', value)}
                right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
            />
            <Button mode="contained" onPress={handleSingIn}>
                Iniciar sesion
            </Button>
            <Text style={style.textRedirect}
            //Onpres para navegar
            onPress={()=>navigation.dispatch(CommonActions.navigate({name:"Register"}))}>
                Notienes una cuenta? Registrate ahora
            </Text>
            <Snackbar
                visible={showMessage.visible}
                onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
                style={{
                    ...style.message,
                    backgroundColor: showMessage.color
                }}>
                {showMessage.message}
            </Snackbar>

        </View>
    )
}