import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        gap: 12, 
        backgroundColor: '#F5F5F5', 
    },
    text: {
        fontSize: 22, 
        fontWeight: 'bold',
        textAlign: "center",
        color: '#333', 
    },
    message: {
        width: '100%',
        padding: 10, 
        backgroundColor: '#EDEDED', 
        borderRadius: 8, 
    },
    textRedirect: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 16, 
        fontWeight: "bold",
        color: "#705AA9",
    },
    rootActivity: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20, 
        backgroundColor: '#FAFAFA', 
    },
    rootHome: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 40,
        padding: 15, 
        backgroundColor: '#FFF', 
        borderRadius: 12, 
        elevation: 3, 
    },
    HeaderHome: {
        flexDirection: "row",
        gap: 12, 
        alignItems: "center",
        paddingVertical: 10, 
    }
});
