import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Table, Row, Rows } from "react-native-table-component-2";
import { Divider } from "react-native-elements";
import { useStocksContext } from "../contexts/StocksContext";
export default function MyTable(props) {
  const { quoteData } = useStocksContext();

  console.log("context", quoteData);
  console.log("index", props.index);

  return (
    <SafeAreaView>
      <Text style={styles.titleText}>
        {" "}
        The Quote of {quoteData[props.index].name}{" "}
      </Text>
      <View style={styles.container}>
        {/* Left Side Data */}
        <View style={styles.subContainer}>
          <View style={styles.leftDataContainer}>
            <Text style={styles.titleText}> Open </Text>
            <Text style={styles.dataText}>
              {" "}
              {quoteData[props.index].open.toFixed(2)}{" "}
            </Text>
          </View>

          <Divider orientation="horizontal" width={0.5} />

          <View style={styles.leftDataContainer}>
            <Text style={styles.titleText}> Day High </Text>
            <Text style={styles.dataText}>
              {" "}
              {quoteData[props.index].dayHigh.toFixed(2)}{" "}
            </Text>
          </View>

          <Divider orientation="horizontal" width={0.5} />

          <View style={styles.leftDataContainer}>
            <Text style={styles.titleText}> Day Low </Text>
            <Text style={styles.dataText}>
              {" "}
              {quoteData[props.index].dayLow.toFixed(2)}{" "}
            </Text>
          </View>
        </View>

        <Divider orientation="vertical" height={"100%"} width={0.5} />

        {/* Right Side Data */}
        <View style={styles.subContainer}>
          <View style={styles.rightDataContainer}>
            <Text style={styles.titleText}> Price </Text>
            <Text style={styles.dataText}>
              {" "}
              {quoteData[props.index].price.toFixed(2)}{" "}
            </Text>
          </View>

          <Divider orientation="horizontal" width={0.5} />

          <View style={styles.rightDataContainer}>
            <Text style={styles.titleText}> Year High </Text>
            <Text style={styles.dataText}>
              {" "}
              {quoteData[props.index].yearHigh.toFixed(2)}{" "}
            </Text>
          </View>

          <Divider orientation="horizontal" width={0.5} />

          <View style={styles.rightDataContainer}>
            <Text style={styles.titleText}> Year Low </Text>
            <Text style={styles.dataText}>
              {" "}
              {quoteData[props.index].yearLow.toFixed(2)}{" "}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    borderColor: "black",
    borderWidth: 5,
  },
  subContainer: {
    flex: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  leftDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    marginBottom: 15,
  },
  rightDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    marginBottom: 15,
  },
  titleText: {
    fontSize: 14,
    color: "#8b8a90",
  },
  dataText: {
    fontSize: 14,
    color: "black",
  },
});
