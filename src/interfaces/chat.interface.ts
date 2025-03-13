export interface ChatRequest {
  messages: string;
  threadId?: string;
}

export interface ChatServiceConfig {
  cookie: {
    account_id: string;
    public_key: string;
    signature: string;
    callback_url: string;
    message: string;
    recipient: string;
    nonce: string;
  };
}

export interface ChatApiResponse {
  annotations: Array<any>;
  value: string;
}

export interface FetchDataResponse {
  result: Result;
}

export interface Result {
  data: Data;
}

export interface Data {
  json: JSON;
}

export interface JSON {
  thread:  Thread;
  message: Message;
  run:     Run;
}

export interface Message {
  id:                 string;
  assistant_id:       null;
  attachments:        null;
  created_at:         number;
  completed_at:       null;
  content:            Content[];
  incomplete_at:      null;
  incomplete_details: null;
  metadata:           null;
  object:             string;
  role:               string;
  run_id:             null;
  status:             string;
  thread_id:          string;
}

export interface Content {
  type: string;
  text: Text;
}

export interface Text {
  annotations: any[];
  value:       string;
}

export interface Run {
  id:                    string;
  thread_id:             string;
  status:                string;
  assistant_id:          string;
  cancelled_at:          null;
  completed_at:          null;
  created_at:            number;
  expires_at:            null;
  failed_at:             null;
  incomplete_details:    null;
  instructions:          string;
  last_error:            null;
  max_completion_tokens: null;
  max_prompt_tokens:     null;
  metadata:              null;
  model:                 string;
  object:                string;
  parallel_tool_calls:   boolean;
  required_action:       null;
  response_format:       null;
  started_at:            number | null;
  tool_choice:           null;
  tools:                 any[];
  truncation_strategy:   null;
  usage:                 null;
  temperature:           null;
  top_p:                 null;
}

export interface Thread {
  id:             string;
  created_at:     number;
  object:         string;
  metadata:       Metadata;
  tool_resources: null;
}

export interface Metadata {
  agent_ids: any[];
  actors:    string;
  owner_id:  string;
}

export interface ThreadApiResponse {
  result: Result;
}

export interface Result {
  data: Data;
}

export interface Data {
  json: JSON;
}

export interface JSON {
  id:             string;
  created_at:     number;
  object:         string;
  metadata:       Metadata;
  tool_resources: null;
  run:            Run;
  messages:       any[];
  files:          any[];
}

export interface Metadata {
  agent_ids: any[];
  topic:     string;
  actors:    string;
  owner_id:  string;
}

export interface Run {
  id:                    string;
  thread_id:             string;
  status:                string;
  assistant_id:          string;
  cancelled_at:          null;
  completed_at:          null;
  created_at:            number;
  expires_at:            null;
  failed_at:             null;
  incomplete_details:    null;
  instructions:          string;
  last_error:            null;
  max_completion_tokens: null;
  max_prompt_tokens:     null;
  metadata:              null;
  model:                 string;
  object:                string;
  parallel_tool_calls:   boolean;
  required_action:       null;
  response_format:       null;
  started_at:            number | null;
  tool_choice:           null;
  tools:                 any[];
  truncation_strategy:   null;
  usage:                 null;
  temperature:           null;
  top_p:                 null;
}

