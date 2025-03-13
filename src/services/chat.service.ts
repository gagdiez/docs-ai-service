import { env } from '../config/env';
import { ChatApiResponse, ChatServiceConfig, FetchDataResponse, ThreadApiResponse } from '../interfaces/chat.interface';

export class ChatService {
  private config: ChatServiceConfig;
  
  constructor(config: ChatServiceConfig) {
    this.config = config;
  }

  private getHeaders(): HeadersInit {
    return {
      cookie: "auth=" + encodeURIComponent(JSON.stringify(this.config.cookie)),
      "content-type": "application/json",
    };
  }

  private async fetchWithErrorHandling<T>(url: string, options: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      return await response.json() as T;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      throw error;
    }
  }

  public async startChat(message: string, threadId?: string): Promise<FetchDataResponse[]> {
    const body: any = {
      json: {
        thread_id: threadId || null,
        agent_id: env.DOCS_GPT_LATEST,
        agent_env_vars: {},
        user_env_vars: {},
        max_iterations: 1,
        new_message: message
      }
    };

    if (threadId) {
      body.meta = {
        meta: {
          values: {
            thread_id: ["undefined"]
          }
        }
      };
    }

    const requestOptions: RequestInit = {
      headers: this.getHeaders(),
      method: "POST",
      body: JSON.stringify({
        "0": body
      })
    };

    return this.fetchWithErrorHandling<FetchDataResponse[]>(
      "https://app.near.ai/api/trpc/hub.chatWithAgent?batch=1",
      requestOptions
    );
  }

  public async getAgentRun(threadId: string): Promise<void> {
    try {
      await fetch(
        `https://app.near.ai/agents/maguila.near/docs-gpt/latest/run?threadId=${threadId}&_rsc=vzr3z`,
        {
          headers: this.getHeaders(),
          method: "GET"
        }
      );
    } catch (error) {
      console.error("Error in getAgentRun:", error);
    }
  }

  public async getThreadMessages({ 
    threadId, 
    messageId, 
    runId 
  }: { 
    threadId: string, 
    messageId: string, 
    runId: string 
  }): Promise<ThreadApiResponse[]> {
    const inputData = {
      "0": {
        "json": {
          "afterMessageId": messageId,
          "mockedAitpMessages": false,
          "runId": runId,
          "threadId": threadId
        }
      }
    };

    const encodedInput = encodeURIComponent(JSON.stringify(inputData));
    const response = await this.fetchWithErrorHandling<ThreadApiResponse[]>(
      `https://app.near.ai/api/trpc/hub.thread?batch=1&input=${encodedInput}`,
      {
        headers: this.getHeaders(),
        method: "GET"
      }
    );
    return response;
  }

  public checkIfHasMessages(threadResponse: ThreadApiResponse[]): boolean {
    return threadResponse.length > 0 && 
           threadResponse[0]?.result?.data?.json?.messages?.length > 0;
  }

  public async chatWithAI(userMessage: string, threadId?: string): Promise<ThreadApiResponse[]> {
    try {
      console.log("Starting chat...");
      const chatResponse = (await this.startChat(userMessage, threadId))[0];

      const { thread, message, run } = chatResponse.result.data.json;
      console.log(`Chat started. Thread ID: ${thread.id}`);

      console.log("Checking run status...");
      await this.getAgentRun(thread.id);

      console.log("Fetching thread messages...");
      console.log({ thread: thread.id, message: message.id, run: run.id });

      await new Promise(resolve => setTimeout(resolve, 1000));
      let threadResponse = await this.getThreadMessages({ 
        threadId: thread.id, 
        messageId: message.id, 
        runId: run.id 
      });
      await new Promise(resolve => setTimeout(resolve, 2500));
      for (let attempt = 1; attempt < 50; attempt++) {
        console.log(`Attempt ${attempt} to get messages`);
        
        if (this.checkIfHasMessages(threadResponse)) {
          console.log("Messages received");
          break;
        }
        
        
        threadResponse = await this.getThreadMessages({ 
          threadId: thread.id, 
          messageId: message.id, 
          runId: run.id 
        });
      }

      return threadResponse;
    } catch (error) {
      console.error("Error in chatWithAI:", error);
      throw error;
    }
  }

  public extractMessageContent(response: ThreadApiResponse[]): ChatApiResponse | undefined {
    if (this.checkIfHasMessages(response)) {
      return response[0].result.data.json.messages[0]?.content[0]?.text;
    }
    return undefined;
  }

  public getThreadId(response: ThreadApiResponse[]): string | undefined {
    if (response.length > 0 && response[0].result?.data?.json?.id) {
      return response[0].result.data.json.id;
    }
    return undefined;
  }

}
