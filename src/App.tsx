import React from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import { Pusher, PusherChannel, PusherEvent, PusherMember } from "@pusher/pusher-websocket-react-native"
import { Message } from './models/message';
import { Hero } from './components/hero';
import { MessageList } from './components/section';
import { ChannelInfo } from './components/channel';
import { Button } from './components/button';
import { DefaultTextInput } from './components/text_input';
import { API } from './models/api';
import { User } from './models/user';
import { PUSHER_CLUSTER, PUSHER_KEY } from '@env'

function App(): JSX.Element {
  var allMessages: Message[] = [];
  const loggedUser = new User('ted', 'Ted Mosby', 'tedmosby');
  const api = new API(loggedUser);

  const pusher = Pusher.getInstance();

  const backgroundStyle = {
    backgroundColor: "#FFF",
  };

  // Pusher config
  const [channelToSubscribe, onChannelNameChanged] = React.useState('');

  // UI Config
  const [messageUpdated, setMessageUpdated] = React.useState(false);
  const [connectionState, updateSubtitle] = React.useState('disconnected');
  const [messagesState, setMessageState] = React.useState<Message[]>(allMessages);
  const [subscriptionState, setSubscribedState] = React.useState('unsubscribed');
  const [subscriptionCount, setSubscriptionCount] = React.useState(0);
  const [members, setMembers] = React.useState<User[]>([]);

  const onEventReceived = (event: PusherEvent) => {
    setMessageUpdated(false);
    const newMessage = Message.fromData(event.eventName, event.data);

    allMessages.push(newMessage);
    setMessageState(allMessages);
    setMessageUpdated(true);
  };

  const onSubscriptionSucceded = (data: any) => {
    setSubscribedState(`subscribed`);
    if (data) {
      const presenceData = data.presence;
      
      if (presenceData && presenceData.ids) {
        setSubscriptionCount(presenceData.count);
        
        const users = presenceData.ids
          .map((id: any) => {
            const userInfo = presenceData.hash[id];
            return new User(id, userInfo.first_name, userInfo.username);
          });

        setMembers(users);
      }
    }
  };

  const onSubscriptionCountReceived = (name: string, count: Number) => {
    if (channelToSubscribe !== name || count == 0) return;
    setSubscriptionCount(count as number);
  }

  const onSubscriptionError = (data: any) => {
    setSubscribedState(`unsubscribed`);
    disconnect();
  }

  const alertError = (message: string) => {
    Alert.alert('Requesty', `${message}`);
  };

  const onAuthorizer = async (channelName: string, socketId: string) => {
    console.log('called');
    return await api.authorize(loggedUser, channelName, socketId);
  };

  const onMemberChanged = (member: PusherMember) => {
    const channel: PusherChannel = pusher.getChannel(channelToSubscribe);
    const newMembers = [...channel.members.values()].map((member) => {
      return new User(member.userId, member.userInfo.first_name, member.userInfo.username);
    });

    setMembers(newMembers);
  };

  const disconnect = async () => {
    await pusher.unsubscribe({ channelName: channelToSubscribe });
    await pusher.disconnect();
    
    allMessages = [];

    setMembers([]);
    setSubscribedState('unsubscribed');
    setMessageState([]);
    setMessageUpdated(false);
    setSubscriptionCount(0);
  };

  const toggle = async () => {
    if (connectionState == "CONNECTED") {
      disconnect()
    } else {
      if (channelToSubscribe.trim() == "") {
        alertError('Channel must not be empty');
        return;
      }
      
      connect();
    }
  }

  const connect = async () => {
    await pusher.init({
      apiKey: PUSHER_KEY,
      cluster: PUSHER_CLUSTER,
      onConnectionStateChange: updateSubtitle,
      onSubscriptionCount: onSubscriptionCountReceived,
      onAuthorizer: onAuthorizer,
      onError: alertError,
    });
  
    await pusher.connect();
    await pusher.subscribe({ 
      channelName: channelToSubscribe,
      onEvent: onEventReceived,
      onSubscriptionSucceeded: onSubscriptionSucceded,
      onSubscriptionError: onSubscriptionError,
      onMemberAdded: onMemberChanged,
      onMemberRemoved: onMemberChanged
    })

    setSubscribedState('subscribing');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={backgroundStyle}>
        <Hero 
          title='Requesty' 
          connectionState={connectionState} 
        />

        <DefaultTextInput 
          onChangeText={onChannelNameChanged} 
          placeholder='Channel name'
          editable={subscriptionState == 'unsubscribed'}
          label="Channel"
        />

        <Button 
          onPress={toggle}
          loadingWhile={connectionState == 'CONNECTING'}
          title={connectionState == "CONNECTED" ? 'Disconnect' : 'Connect & Subscribe'}
        />
      </View>

      <ChannelInfo
        api={api}
        pusher={pusher}
        channelName={channelToSubscribe} 
        subscriptionState={subscriptionState} 
        subscriptionCount={subscriptionCount}
        members={members}
      />

      <MessageList shouldUpdate={messageUpdated} messages={messagesState} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
});

export default App;
