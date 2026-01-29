import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { Progress } from "@/components/Progress";
import { PageHeader } from "@/components/PageHeader";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { TransactionTypes } from "@/utils/TransactionTypes";

const details = {
    current: "R$ 580,00",
    target: "R$ 1.790,00",
    percentage: 25
}
const transactions: TransactionProps[] = [
    {
        id: "1",
        value: "R$ 20,00",
        date: "12/04/25",
        type: TransactionTypes.Output
    },
    {
        id: "1",
        value: "R$ 300,00",
        date: "12/04/25",
        description: "CDB de 110% no banco XPTO",
        type: TransactionTypes.Input
    },
]
export default function InProgress() {
    const params = useLocalSearchParams<{ id: string }>()
    return (
        <View style={{ flex: 1, padding: 24, gap: 32 }}>
            <PageHeader title="Apple Watch" rightButton={{ icon: "edit", onPress: () => { } }} />
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