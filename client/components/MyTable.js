import { StyleSheet, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component-2";
import { useStocksContext } from "../contexts/StocksContext";
export default function MyTable(props) {
  const { quoteData } = useStocksContext();

  console.log("context", quoteData);
  console.log("index", props.index);

  let state = {
    tableHead: [`${quoteData[props.index].name}`],
    tableData: [
      [
        "Price",
        `${quoteData[props.index].price}`,
        "Open",
        `${quoteData[props.index].open}`,
      ],
      [
        "DayHigh",
        `${quoteData[props.index].dayHigh}`,
        "YearHigh",
        `${quoteData[props.index].yearHigh}`,
      ],
      [
        "DayLow",
        `${quoteData[props.index].dayLow}`,
        "YearLow",
        `${quoteData[props.index].yearLow}`,
      ],
      ["Have a nice day!!"],
    ],
  };

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row
          data={state.tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        <Rows data={state.tableData} textStyle={styles.text} />
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
});
