import { scaleSize } from "../constants/Layout";
import { SafeAreaView, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import SearchApiHistory from "../contexts/ApiHistory";
import { useStocksContext } from "../contexts/StocksContext";

export default function MyChart1(props) {
  const { quoteData } = useStocksContext();
  const { loading, rowData, error } = SearchApiHistory(
    quoteData[props.index].symbol
  );
  const open = rowData.map((x) => x.open);
  let open_filter = [];
  for (let i = 0; i < open.length; i = i + 30) {
    open_filter.push(parseInt(open[i]));
  }
  console.log("open filter", open_filter);
  const date = rowData.map((x) => x.date);
  let date_filter = [];
  for (let i = 0; i < date.length; i = i + 30) {
    date_filter.push(date[i]);
  }
  let test = [100.0, 1000.12, 100.12, 1000.12];
  console.log("test", test);
  const data = {
    labels: date_filter.reverse(),
    datasets: [
      {
        data: open_filter,
      },
    ],
    legend: [`${quoteData[props.index].symbol}`], // optional
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
        height={220}
        yAxisLabel="$"
        yAxisInterval={1} // optional, defaults to 1
        withDots={false}
        chartConfig={chartConfig}
      />
    </SafeAreaView>
  );
}
