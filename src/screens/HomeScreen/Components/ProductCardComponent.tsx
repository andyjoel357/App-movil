import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { style } from "../../../theme/style";

export const ProductCardComponent = () => {
    return (
        <View style={style.rootListProduct}>
            <View>
                <Text variant="labelLarge">Nombre:</Text>
                <Text variant="bodyMedium">Precio:</Text>

            </View>
            <View style={style.icon}>
                <IconButton
                    icon="album"
                    size={20}
                    mode="outlined"
                    onPress={() => console.log("Press")}
                />
            </View>
        </View>
    )
}
