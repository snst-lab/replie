import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { Job } from 'bull';
import { ErrorService } from '@/services';

@Injectable()
export class GptService {
  constructor(private readonly error: ErrorService) {}

  async usePrompt({
    message,
    queue,
  }: {
    message: string;
    queue: Json;
  }): Promise<string> {
    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);

      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
      });
      const response = completion.data.choices[0].text;

      return response;
    } catch (error) {
      this.error.catch(error);
    }
  }
}

@Injectable()
@Processor('queue')
export class GptConsumer {
  constructor(private readonly gptService: GptService) {}
  @Process('usePrompt')
  async usePrompt(job: Job) {
    const response = await this.gptService.usePrompt(job.data);
    return response;
  }
}
