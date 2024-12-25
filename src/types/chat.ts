export interface Message {
  id: string;
  subject: string;
  participant: string;
  type: string;
  location: string;
  status: "read" | "unread";
  lastMessage: string;
  content?: string;
  actions?: Array<{
    label: string;
    action: string;
  }>;
}

export interface MessageAction {
  label: string;
  action: string;
}