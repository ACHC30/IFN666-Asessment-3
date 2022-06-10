import { scaleSize } from "../constants/Layout";
import { SafeAreaView, Dimensions, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import SearchApiHistory from "../contexts/ApiHistory";
import { useStocksContext } from "../contexts/StocksContext";

export default function MyChart(props) {
  const { quoteData } = useStocksContext();
  const { loading, rowData, error } = SearchApiHistory(
    quoteData[props.index].symbol
  );

  if (loading) {
    return (
      <SafeAreaView>
        <Text style={styles.titleText}>Loading...</Text>
      </SafeAreaView>
    );
  } else if (error) {
    return (
      <SafeAreaView>
        <Text style={styles.titleText}>Something went wrong with the API</Text>
      </SafeAreaView>
    );
  } else {
    const open_temp = rowData.map((x) => x.open);
    let open_filtered = [];
    for (let i = 0; i < open_temp.length; i = i + 30) {
      open_filtered.push(open_temp[i]);
    }
    const date_temp = rowData.map((x) => x.date);
    let date_filtered = [];
    for (let i = 0; i < date_temp.length; i = i + 30) {
      date_filtered.push(date_temp[i]);
    }
    // Set chart data
    const data = {
      labels: date_filtered.reverse(),
      datasets: [
        {
          data: open_filtered.reverse(),
        },
      ],
      legend: [
        `${quoteData[props.index].symbol} history per 30 days (1 month)`,
      ], // optional
    };

    // Chart config
    const chartConfig = {
      backgroundColor: "#1b1c1e",
      backgroundGradientFrom: "#1b1c1e",
      backgroundGradientTo: "#1b1c1e",
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: "1",
        strokeWidth: "2",
        stroke: "#ffa726",
      },
    };
    return (
      <SafeAreaView>
        <LineChart
          data={data}
          width={Dimensions.get("window").width} // from react-native
          height={scaleSize(220)}
          yAxisLabel="$"
          yAxisInterval={1} // optional, defaults to 1
          withDots={false}
          chartConfig={chartConfig}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    color: "black",
  },
});
