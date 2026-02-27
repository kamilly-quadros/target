import { useSQLiteContext } from "expo-sqlite"

export type TargetCreate = {
    name: string
    amount: number
}
export type TargetResponde = {
    id: number
    name: string
    amount: number
    current: number
    percentage: number
    created_at: Date
    updated_at: Date
}
export function useTargetDatabase() {
    const database = useSQLiteContext()
    async function create(data: TargetCreate) {
        const statement = await database.prepareAsync("INSERT INTO targets (name, amount) VALUES ($name, $amount)")
        statement.executeAsync({
            $name: data.name,
            $amount: data.amount
        })
    }
    function listBySavedValue() {
        return database.getAllAsync<TargetResponde>(`
            SELECT
                targets.id,
                targets.name,
                targets.amount
            FROM
                targets
        `)
    }
    return {
        create,
        listBySavedValue
    }
}