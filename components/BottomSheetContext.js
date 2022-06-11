import { View, SafeAreaView } from "react-native";
import MyChart from "./MyChart";
import MyTable from "./MyTable";

export default function BottomSheetContext(props) {
  return (
    <SafeAreaView>
      <View>
        <MyTable index={props.index}></MyTable>
        <MyChart index={props.index}></MyChart>
      </View>
    </SafeAreaView>
  );
}
