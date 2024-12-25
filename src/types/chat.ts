export type MessageAction = {
  label: string;
  action: string;
  data?: any;
};

export type Message = {
  id?: string;
  content: string;
  type: "user" | "bot";
  actions?: MessageAction[];
};