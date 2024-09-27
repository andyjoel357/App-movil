import React, { useState } from "react";
import { View } from "react-native";
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { style } from "../theme/style";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

//interface - FormRegister
interface FormRegister {
  email: String,
  password: String
}

//interface - message
interface ShowMessage {
  visible: boolean,
  message: string,
  color: string
}

export const RegisterScreen = () => {
  //Hok useState: cambia el estado del formulario
  const [formRegister, setFormRegister] = useState<FormRegister>({
    email: "",
    password: ""
  });
  //hoks useState
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff"
  })
const navigation = useNavigation();
  //hook usestate: Cambiar el estado del mensaje
  const [hiddenPassword, setHiddenPassword] = useState<Boolean>(true);

  //Funcion: actualizar el estado del formulario
  const handleSetValues = (key: string, value: string) => {
    setFormRegister({ ...formRegister, [key]: value });
  }

  //Funcion: PARA REGISTRAR
  const handleRegister = async () => {
    if (!formRegister.email || !formRegister.password) {
      setShowMessage({
        visible: true,
        message: "Completa todos los campos!",
        color: "#fe0000"
      })
      return;
    }
    console.log(formRegister);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
      );
      setShowMessage({
        visible: true,
        message: "Registro exitoso",
        color: "#085f06"
      });
    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: "No se logro registrar, intente mas tarde",
        color: "#fe0000"
      });
    }
  }

  return (
    <View style={style.root}>
      <Text style={style.text}>Registrate</Text>
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
        secureTextEntry={hiddenPassword}
        onChangeText={(value) => handleSetValues('password', value)}
        right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
      />
      <Button mode="contained" onPress={handleRegister}>
        Registrar
      </Button>
      <Text style={style.textRedirect}
        //Onpres para navegar
        onPress={() => navigation.dispatch(CommonActions.navigate({ name: "Login" }))}>
        Ya tienes una cuenta? Inicia Sesion
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
