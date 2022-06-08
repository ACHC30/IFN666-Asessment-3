import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  Button,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheetContext from "./BottomSheetContext";

export default function OpenBottomSheet(props) {
  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <RBSheet
          ref={props.refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={500}
          //   openDuration={250}

          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "black",
            },
            container: {
              backgroundColor: "white",
            },
          }}
        >
          <BottomSheetContext index={props.index} />
        </RBSheet>
      </View>
    </SafeAreaView>
  );
}
