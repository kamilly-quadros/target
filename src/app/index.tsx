import { router } from "expo-router";
import { fontFamily } from "@/theme/fontFamily";
import { View, Text, Button } from "react-native";

export default function Index() {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontFamily: fontFamily.bold, fontSize: 34 }}>Olá, Expo Router</Text>
            <Button title="Nova Meta" onPress={() => router.navigate("/target")} />
            <Button title="Transação" onPress={() => router.navigate("/transaction/765890")} />
            <Button title="Progresso" onPress={() => router.navigate("/in-progress/12")} />
        </View>
    )
}