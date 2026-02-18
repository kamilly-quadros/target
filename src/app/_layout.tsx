import { Suspense } from "react"
import { Stack } from "expo-router"
import { colors } from "@/theme/colors"
import { migrate } from "@/database/migrate"
import { SQLiteProvider } from "expo-sqlite"
import { Loading } from "@/components/Loading"
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from "@expo-google-fonts/inter"


export default function Layouit() {
    const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_700Bold })
    if (!fontsLoaded) { return <Loading /> }
    return (
        <Suspense fallback={<Loading />}>
            <SQLiteProvider databaseName="target.db" onInit={migrate} useSuspense>
                <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.white } }} />
            </SQLiteProvider>
        </Suspense>
    )
}