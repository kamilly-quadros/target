import { router } from "expo-router";
import { View, Text, Button } from "react-native";

export default function Index() {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Olá, Expo Router</Text>
            <Button title="Nova Meta" onPress={() => router.navigate("/target")} />
            <Button title="Transação" onPress={() => router.navigate("/transaction/765890")} />
        </View>
    )
}