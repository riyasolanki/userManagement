import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: any; // ✅ ADD THIS
}

const CustomTextInput: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  style,
}) => {
  return (
    <View>
      <TextInput
        style={[styles.input, style]} // ✅ MERGE STYLE
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
});