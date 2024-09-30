import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { style } from "../../../theme/style";
import { Product } from "../HomeScreen";
import { CommonActions, useNavigation } from "@react-navigation/native";

interface Props{
    product: Product;
}
export const ProductCardComponent = ({product}:Props) => {
    //hook de navegacion
    const navigation =useNavigation();
    return (
        <View style={style.rootListProduct}>
            <View>
                <Text variant="labelLarge">Nombre:{product.nameProduct}</Text>
                <Text variant="bodyMedium">Precio:${product.price}</Text>

            </View>
            <View style={style.icon}>
                <IconButton
                    icon="google-circles-group"
                    size={20}
                    mode="outlined"
                    onPress={()=> navigation.dispatch(CommonActions.navigate({name:'Detail', params:{product}}))}
                />
            </View>
        </View>
    )
}
