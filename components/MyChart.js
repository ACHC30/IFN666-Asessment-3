import { scaleSize } from "../constants/Layout";
import { SafeAreaView, View, Dimensions, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import SearchApiHistory from "../contexts/ApiHistory";
import { useStocksContext } from "../contexts/StocksContext";
import { Divider } from "react-native-elements";

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
    const date = rowData.map((x) => x.date);
    let date_filter = [];
    for (let i = 0; i < date.length; i = i + 30) {
      date_filter.push(date[i]);
    }
    const close = rowData.map((x) => x.close);
    let close_filter = [];
    for (let i = 0; i < close.length; i = i + 30) {
      close_filter.push(close[i]);
    }
    const latestOpen = rowData[rowData.length - 1].open;
    const latestvVolume = rowData[rowData.length - 1].volume;
    const latestHigh = rowData[rowData.length - 1].high;
    const latestLow = rowData[rowData.length - 1].low;

    // Set chart data
    const dataClose = {
      labels: date_filter.reverse(),
      datasets: [
        {
          data: close_filter.reverse(),
        },
      ],
      legend: [`${quoteData[props.index].symbol} close prices over a month`], // optional
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
          data={dataClose}
          width={Dimensions.get("window").width} // from react-native
          height={scaleSize(200)}
          yAxisLabel="$"
          yAxisInterval={1} // optional, defaults to 1
          withDots={false}
          chartConfig={chartConfig}
        />
        <View style={styles.dataContainer}>
          <View>
            <Text style={styles.dataText}> Latest Open: {latestOpen} </Text>
            <Text style={styles.dataText}>
              {" "}
              Latest Volume: {latestvVolume}{" "}
            </Text>
          </View>
          <Divider orientation="vertical" height={"100%"} width={0.5} />
          <View>
            <Text style={styles.dataText}> Latest Day High: {latestHigh} </Text>
            <Text style={styles.dataText}> Latest Day Low : {latestLow} </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    color: "black",
  },
  dataText: {
    fontSize: 14,
    color: "black",
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    marginBottom: 15,
  },
});
