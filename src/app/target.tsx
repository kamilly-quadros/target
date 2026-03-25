import { Alert, View } from "react-native";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { router, useLocalSearchParams } from "expo-router";
import { useTargetDatabase } from "@/database/useTargetDatabase";

export default function Target() {
    const [name, setName] = useState("")
    const targetDatabase = useTargetDatabase()
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
            if (amount) await targetDatabase.create({ name, amount })
            Alert.alert("Nova Meta", "Meta criada com sucesso!", [{ text: "Ok", onPress: () => router.back() }])
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar a meta.")
            console.error(error)
            setIsProcessing(false)
        }
    }
    async function fetchDetails(id: number) {
        try {
            const response = await targetDatabase.show(id)
            if (!response) return
            setName(response.name)
            setAmount(response.amount)
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.")
            console.log(error)
        }
    }
    useEffect(() => { if (params.id) { fetchDetails(Number(params.id)) } }, [params.id])
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