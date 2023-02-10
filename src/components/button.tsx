import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = PropsWithChildren<{
  title: string;
  loadingWhile: boolean;
}>;

export function Button({onPress, title, loadingWhile}: ButtonProps): JSX.Element {
  const newTitle = loadingWhile ? 'Loading...' : title;
  const style = loadingWhile ? styles.loadingButton : styles.button;

  return (
    <Pressable style={style} disabled={loadingWhile} onPress={onPress}>
      <Text style={styles.text}>{newTitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#262d4d',
  },
  loadingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#363b59',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});