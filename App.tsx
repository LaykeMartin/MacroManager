import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <View style={styles.appContainer}>
      <Home />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    height: '100%',
    backgroundColor: '#e7c388'
  }
})