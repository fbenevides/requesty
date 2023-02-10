import { PusherAuthorizerResult } from "@pusher/pusher-websocket-react-native";
import { User } from "./user";
import { API_URL } from "@env";

export class API {
  private _user: User;

  constructor(user: User) {
    this._user = user;
  }

  public async authorize(user: User, channelName: string, socketId: string) {
    const body = JSON.stringify({
      socket_id: socketId,
      channel_name: channelName,
    });

    const response = await fetch(`${API_URL}/pusher/channel-auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': this._user.id
      },
      body: body,
    });

    if (response.status == 200) {
      return response.json() as Promise<PusherAuthorizerResult>;
    }

    return Promise.resolve;
  }

  public async trigger(channelName: string) {
    const body = JSON.stringify({
      channel: channelName,
      message: `server event: ${Date.now()}`,
    });

    const response = await fetch(`${API_URL}/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': this._user.id
      },
      body: body,
    });

    return response.json()
  };

}