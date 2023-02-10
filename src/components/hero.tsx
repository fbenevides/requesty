import { PropsWithChildren } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { StyleSheet, Text , View } from "react-native";

type HeroProps = PropsWithChildren<{
  title: string;
  connectionState: string;
}>;

export function Hero({title, connectionState}: HeroProps): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.heroTitle,
          {
            color: Colors.black,
          },
        ]}>
        {title}
      </Text>

      <View style={styles.channelInfoContainer}>
        <Text
          style={[
            styles.heroSubtitle,
            {
              color: Colors.dark,
            },
          ]}>
          status: {connectionState.toLowerCase()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,

    alignContent: "center",
  },
  channelInfoContainer: {
    marginBottom: 20
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    alignContent: "center",
  },
  heroSubtitle: {
    fontSize: 15,
    fontWeight: '400',
    alignContent: "center",
  },
  highlight: {
    fontWeight: '700',
  },
});