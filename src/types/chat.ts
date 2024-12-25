export type MessageStatus = "read" | "unread";
export type MessageType = "user" | "bot";

export interface MessageAction {
  label: string;
  action: string;
  data?: any;
}

export interface Message {
  id: string;
  subject: string;
  participant: string;
  type: MessageType;
  location: string;
  status: MessageStatus;
  lastMessage: string;
  content?: string;
  actions?: MessageAction[];
}