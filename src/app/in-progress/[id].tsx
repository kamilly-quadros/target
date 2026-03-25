import { Alert, View } from "react-native";
import { useCallback, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { Progress } from "@/components/Progress";
import { PageHeader } from "@/components/PageHeader";
import { Transaction } from "@/components/Transaction";

import { numberToCurrency } from "@/utils/numberToCurrency";

import { useTargetDatabase } from "@/database/useTargetDatabase";

export default function InProgress() {
    const targetDatabase = useTargetDatabase()
    const [isFetching, setIsFetching] = useState(true)
    const params = useLocalSearchParams<{ id: string }>()
    const [details, setDetails] = useState({ name: "", current: "R$0,00", target: "R$ 0,00", percentage: 0 })
    async function fetchData() {
        const fetchDetailsPromise = fetchDetails()
        await Promise.all([fetchDetailsPromise])
        setIsFetching(false)
    }
    async function fetchDetails() {
        try {
            const response = await targetDatabase.show(Number(params.id))
            if (!response) {
                Alert.alert("Erro", "Meta não encontrada.")
                return
            }
            setDetails({
                name: response.name,
                current: numberToCurrency(response.current),
                target: numberToCurrency(response.amount),
                percentage: response.percentage
            })
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.")
            console.error(error)
        }
    }
    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    )
    if (isFetching) { return <Loading /> }
    return (
        <View style={{ flex: 1, padding: 24, gap: 32 }}>
            <PageHeader title={details.name} rightButton={{ icon: "edit", onPress: () => { router.navigate(`/target?id=${params.id}`) } }} />
            <Progress data={details} />
            <List
                title="Transações"
                data={[]}
                renderItem={({ item }) => <Transaction data={item} onRemove={() => { }} />}
                emptyMessage="Nenhuma transação. Toque em nova ransação para guardar seu primeiro dinheiro aqui."
            />
            <Button title="Nova transação" onPress={() => router.navigate(`/transaction/${params.id}`)} />
        </View>
    )
}