import { colors } from "@/theme";
import { styles } from "./styles";
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from "react-native";

type Props = TouchableOpacityProps & {
    title: string
    isProcessing?: boolean
}
export function Button({ title, isProcessing = false, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} disabled={isProcessing}{...rest}>
            <Text style={styles.title}>
                {isProcessing ? (<ActivityIndicator size="small" color={colors.white} />) : (title)}
            </Text>
        </TouchableOpacity>
    )
}