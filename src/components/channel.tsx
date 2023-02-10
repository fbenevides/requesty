import { PropsWithChildren, useState } from "react";
import { Alert, StyleSheet, Text , View } from "react-native";
import { API } from "../models/api";
import { Pusher } from "@pusher/pusher-websocket-react-native"
import { User } from "../models/user";
import { Button } from "./button";

type ChannelInfoProps = PropsWithChildren<{
  api: API,
  channelName: string;
  subscriptionState: string;
  subscriptionCount: number;
  members: Array<User>;
  pusher: Pusher
}>;

export function ChannelInfo({api, pusher, channelName, subscriptionState, subscriptionCount, members}: ChannelInfoProps): JSX.Element {
  const isSubscribed = subscriptionState == 'subscribed';
  const [loading, setLoading] = useState(false);

  const trigger = async () => {
    setLoading(true);
    api.trigger(channelName)
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }

  const triggerClientEvent = async () => {
    const successMessage = "Client event sent successfully. Keep in mind that only other subscribers will receive client events.";

    setLoading(true);
    pusher.trigger({ 
      eventName: 'client-event-test', 
      channelName: channelName,
      data: JSON.stringify({ message: `client-event sent ${Date.now()}` })
    }).catch(e => console.log(e))
    .then(() => Alert.alert('Requesty', successMessage))
    .finally(() => setLoading(false));
  }

  if (isSubscribed) {
    return (
      <View style={styles.channelInfoContainer}>
        <Text style={styles.text}>
          subscribed to <Text style={{ fontWeight: "700" }}>{channelName}</Text>
        </Text>

        <Text style={styles.text}>
          subscription count: {subscriptionCount}
        </Text>

        <MembersList members={members} />

        <View style={{ marginBottom: 5 }}>
          <Button 
            onPress={trigger}
            loadingWhile={loading}
            title='Trigger random server event'
          />
        </View>
        
        <Button 
          onPress={triggerClientEvent}
          loadingWhile={loading}
          title='Trigger client event'
        />
      </View>
    );
  }

  return (<></>);  
}

function MembersList({members}: PropsWithChildren<{members: Array<User>}>): JSX.Element {
  if (members.length == 0)  return (<></>);

  const containerList = members.map((user) => 
    (<Text key={user.id} style={styles.text}>- {user.username}</Text>)
  );

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontWeight: '700', color: '#FFF', marginTop: 10, marginBottom: 10 }}>Members</Text>
      {containerList}
    </View>
  )
}

const styles = StyleSheet.create({
  channelInfoContainer: {
    marginVertical: 20,
    backgroundColor: "#111118",
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontWeight: "700",
    borderRadius: 4
  },
  text: {
    color: "#FFF",
    marginBottom: 5,
  }
});