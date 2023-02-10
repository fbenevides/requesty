import { PropsWithChildren } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

type TextInputProps = PropsWithChildren<{
  placeholder: string;
  onChangeText: any,
  editable: boolean;
  label: string;
  required: boolean;
}>;

export function DefaultTextInput({placeholder, onChangeText, editable, label, required}: TextInputProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.textInput}>
        <TextInput 
          onChangeText={onChangeText}
          keyboardType="default"
          editable={editable}
          autoCapitalize="none"
          placeholder={placeholder} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 15,
    borderRadius: 4,
    borderColor: '#2b2c3c',
    borderStyle: "solid",
    borderWidth: 1,
    elevation: 3,
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  }
});