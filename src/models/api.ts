import { PusherAuthorizerResult } from "@pusher/pusher-websocket-react-native";
import { User } from "./user";

export class API {
  private _user: User;
  private baseUrl = "https://f87b-2a02-a210-2547-e600-1ca-37f8-8b73-5819.ngrok.io"

  constructor(user: User) {
    this._user = user;
  }

  public async authorize(user: User, channelName: string, socketId: string): Promise<PusherAuthorizerResult> {
    const body = JSON.stringify({
      socket_id: socketId,
      channel_name: channelName,
    });

    const response = await fetch(`${this.baseUrl}/pusher/channel-auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': this._user.id
      },
      body: body,
    });

    return await response.json() as PusherAuthorizerResult;
  }

  public async trigger(channelName: string) {
    const body = JSON.stringify({
      channel: channelName,
      message: `Server Event ${Math.random()}`,
    });

    const response = await fetch(`${this.baseUrl}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': this._user.id
      },
      body: body,
    });

    return await response.json()
  };

}