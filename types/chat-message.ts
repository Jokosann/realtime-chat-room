export interface IMessage {
  id: string;
  name: string;
  image: string;
  text: string;
  created_at: string;
  is_replay: boolean;
  reply_to: string;
}

export interface IRawMessage {
  id: IMessage;
}

export interface IReply {
  isReply: boolean;
  name: string;
}
