import { PropsWithChildren } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FlatList, FlatListProps, ScrollView, StyleSheet, Text , View } from "react-native";
import { Message } from "../models/message";
import React from "react";

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type MessageListProps = PropsWithChildren<{
  messages: Array<Message>;
  shouldUpdate: Boolean;
}>;

export function MessageList({messages, shouldUpdate}: MessageListProps) {
  return (
    <FlatList
        extraData={shouldUpdate}
        data={messages}
        keyExtractor={((item) => item.timestamp)}
        renderItem={({item}) => (
          <Section title={item.title}>
            <Text style={{marginBottom: 10, marginTop: 10}}>{item.content}</Text>
            <Text>Timestamp: {item.timestamp}</Text>
          </Section>
        )}
      />
  )
};

export function Section({children, title}: SectionProps): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <View>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: Colors.black,
            },
          ]}>
          {title}
        </Text>
      </View>
      
      <View>
        {children}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});