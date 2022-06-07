import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { ListItem } from "react-native-elements";

export default function WatchList(props) {
  let data = props.rowData;
  return (
    <SafeAreaView>
      <ScrollView>
        {data.map((item, i) => (
          <View key={i} style={styles.container}>
            <ListItem
              containerStyle={styles.listitem}
              onPress={() => {
                props.setHistorySymbol(i);
                props.refRBSheet.current.open();
              }}
            >
              <ListItem.Content>
                <ListItem.Title style={styles.symbol}>
                  {item.symbol}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} style={styles.name}>
                  {item.name}
                </ListItem.Subtitle>
              </ListItem.Content>
              <View style={{ flex: 1, width: "auto", maxWidth: "25%" }}>
                <ListItem.Content>
                  <ListItem.Title style={styles.symbol}>
                    {"$" + item.price.toFixed(2)}
                  </ListItem.Title>
                </ListItem.Content>
                <View>
                  <Button
                    title={item.percentage.toFixed(2) + "%"}
                    color={item.percentage > 0 ? "#228B22" : "#B22222"}
                  />
                </View>
              </View>
            </ListItem>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", color: "white", borderRadius: 10 },
  listitem: {
    backgroundColor: "black",
    borderRadius: 10,
    borderBottomColor: "white",
  },
  symbol: {
    // backgroundColor: "white",
    color: "white",
    padding: 5,
    borderRadius: 10,
    borderBottomColor: "white",
    margin: 2,
  },
  name: {
    // backgroundColor: "white",
    color: "#808080",
    padding: 5,
    borderRadius: 10,
    borderBottomColor: "white",
    margin: 2,
  },
  br: {
    height: 1,
    backgroundColor: "#808080",
  },
});
