import { API_URL, PUSHER_CLUSTER, PUSHER_KEY } from "@env";
import { PropsWithChildren } from "react";
import { StyleSheet, Text , View } from "react-native";

type HeroProps = PropsWithChildren<{
  title: string;
  connectionState: string;
}>;

export function Hero({title, connectionState}: HeroProps): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.heroTitle}>
        {title}
      </Text>

      <View style={styles.channelInfoContainer}>
        <View style={{ marginBottom: 8 }}>
          <Text style={styles.heroSubtitle}>
            key: {PUSHER_KEY}
          </Text>
          <Text style={styles.heroSubtitle}>
            cluster: {PUSHER_CLUSTER}
          </Text>
        </View>
        
        <Text style={styles.heroSubtitle}>
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