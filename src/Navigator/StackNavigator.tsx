import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { style } from '../theme/style';
import { DetailProductScreen } from '../screens/HomeScreen/DetailProductScreen';

//INTERFACE - PARA RUTAS (STACKSCREEN)
interface Routes {
    name: string,
    screen: () => JSX.Element; // Componente React
    headerShow?: boolean;
    title?: string
}
//Arreglos que contienen los screens cuando no este autenticado
const routes: Routes[] = [
    { name: 'Login', screen: LoginScreen },
    { name: 'Register', screen: RegisterScreen },
    { name: 'Home', screen: HomeScreen },
    { name: 'Detail', screen: DetailProductScreen, headerShow: true }
];

//Arreglo de rutas cuando si ete auth
// const routesAuth: Routes[] = [
//     { name: 'Home', screen: HomeScreen },
//     { name: 'Detail', screen: DetailProductScreen, headerShow: true }
// ]

const Stack = createStackNavigator();

export const StackNavigator = () => {
    //Hook useState: verificar si esta autenticado o no
    const [isAuth, setIsAuth] = useState<Boolean>(false);

    //Elemento cargando
    const [isLoading, setIsLoadin] = useState<Boolean>(false);

    //Hook useefect: validar el estado de autenticacion
    useEffect(() => {
        setIsLoadin(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
            }
            setIsLoadin(false);
        });
    }, []);
    return (
        <>
            {isLoading ? (
                <View>
                    <ActivityIndicator animating={true} size={30} style={style.rootActivity} />
                </View>
            ) : (
                <Stack.Navigator initialRouteName={isAuth ? 'Home' : 'Login'}>
                    {                      
                            routes.map((item, index) => (
                                <Stack.Screen key={index}
                                    name={item.name}
                                    options={{ headerShown: item.headerShow ?? false, title:'Detalle del productotr' }}
                                    component={item.screen} />
                            ))
                    }
                </Stack.Navigator>
            )}
        </>
    );
}
