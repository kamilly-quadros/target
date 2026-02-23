import { useState } from "react";
import { Alert, View } from "react-native";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { router, useLocalSearchParams } from "expo-router";

export default function Target() {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState<number | null>(0)
    const [isProcessing, setIsProcessing] = useState(false)
    const params = useLocalSearchParams<{ id?: string }>()
    function handleSave() {
        if (!name.trim() || !amount || amount <= 0) {
            return Alert.alert("Atenção", "Preencha nome e o valor precisa ser maior que zero.")
        }
        setIsProcessing(true)
        if (params.id) {
            //update
        } else {
            create()
        }
    }
    async function create() {
        try {
            Alert.alert("Nova Meta", "Meta criada com sucesso!", [{ text: "Ok", onPress: () => router.back() }])
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar a meta.")
            console.error(error)
            setIsProcessing(false)
        }
    }
    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader
                title="Meta"
                subtitle="Economize para alcançar sua meta financeira."
            />
            <View style={{ marginTop: 32, gap: 24 }}>
                <Input label="Nome da Meta" placeholder="Ex: Viagem para praia, Apple Watch" onChangeText={setName} value={name} />
                <CurrencyInput label="Valor alvo (R$)" value={amount} onChangeValue={setAmount} />
                <Button title="Salvar" onPress={handleSave} isProcessing={isProcessing} />
            </View>
        </View>
    )
}