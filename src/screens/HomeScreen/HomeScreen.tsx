import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { style } from "../../theme/style";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
//Interfaz: Informacion del usuario  UserAuth
interface UserAuth {
    name: string;
}
export const HomeScreen = () =>{
    //Crear un hook- UseState: Cambiar el estado del formulario
const [userAuth, setUserAuth] = useState<UserAuth>({
    name: ""
});
//hook UseEffect : validar la autenticacion
useEffect(()=>{
onAuthStateChanged(auth,(user)=>{
    if(user){
    setUserAuth({name: user.displayName ?? 'NA' })
    }
})
},[])

    return (
        <View style={style.rootHome}>
            <View style={style.HeaderHome}>
                <Avatar.Text size={50} label="IM" />
                <View>
                    <Text variant="bodySmall">Bienvenido</Text>
                    <Text variant="labelLarge">{userAuth.name}</Text>
                </View>
            </View>
        </View>
    )
}