export type MessageStatus = "read" | "unread";

export interface Message {
  id: string;
  subject: string;
  participant: string;
  type: string;
  location: string;
  status: MessageStatus;
  lastMessage: string;
}