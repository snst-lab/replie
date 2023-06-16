import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { ClientKafka } from '@nestjs/microservices';
import { InjectQueue, OnGlobalQueueCompleted } from '@nestjs/bull';
import { Queue } from 'bull';
import { ErrorService, PrismaService } from '@/services';

type QueueMaster = {
  id: number;
  groupId: number;
  email: string;
  password: string;
  cookie: any;
  localStorage: any;
  proxyUrl: string;
  proxyUser: string;
  proxyPass: string;
};

@Injectable()
export class QueueService implements OnModuleInit, OnModuleDestroy {
  private queueMaster: QueueMaster[] = [];
  private queueState: boolean[] = [];
  // private messagePatterns: string[] = ['usePrompt'];

  constructor(
    private readonly prisma: PrismaService,
    private readonly error: ErrorService,
    @Inject(CACHE_MANAGER) private readonly redis: CacheStore,
    @InjectQueue('queue') protected readonly queue: Queue, // @Inject(process.env.KAFKA_CLIENT_NAME) // protected readonly kafka: ClientKafka,
  ) {}

  async onModuleInit() {
    // this.messagePatterns.forEach((key) => {
    //   this.kafka.subscribeToResponseOf(`${key}`);
    // });
    // await this.kafka.connect();
  }

  async onModuleDestroy() {
    // await this.kafka.close();
  }

  async init(): Promise<void> {
    this.queueMaster = await this.prisma.queueMaster.findMany();
    await this.redis.set('queueMaster', this.queueMaster);
    await this.redis.set(
      'queueState',
      new Array(this.queueMaster.length).fill(true),
    );
  }

  async enqueue(index: number) {
    if (!this.queueMaster[index] || !this.queueState[index]) {
      this.error.throw('not-found-cache');
    }
    this.queueState[index] = false;
    await this.redis.set('queueState', this.queueState);
    return this.queueMaster[index];
  }

  async dequeue(index: number) {
    this.queueState[index] = true;
    await this.redis.set('queueState', this.queueState);
  }

  async send(
    messagePattern: string,
    serviceMethod: (args: Json) => Promise<any>,
    args: Json,
    {
      onCompleted,
      onFailed,
    }: { onCompleted: (response: any) => void; onFailed: (error: any) => void },
  ): Promise<void> {
    try {
      this.queueState = await this.redis.get<boolean[]>('queueState');
      const index = this.queueState.findIndex((value) => value);
      if (index === 0 || index === -1) {
        // const observable = await this.kafka.send(messagePattern, {
        //   ...args,
        //   queue: this.queueMaster[0],
        // });
        // const response = await observable.unwrap();
        const currentJobs = await this.queue.getJobs(['active', 'waiting']);
        if (currentJobs.length === 0) {
          this.queue.removeAllListeners('completed');
          this.queue.removeAllListeners('failed');
        }
        const queue = await this.enqueue(0);
        const { id: jobId } = await this.queue.add(messagePattern, {
          ...args,
          queue,
        });
        this.queue.on('completed', async (job, result) => {
          if (job.id === jobId) {
            await this.dequeue(0);
            await onCompleted(job.returnvalue);
          }
        });
        this.queue.on('failed', async (job, error) => {
          if (job.id === jobId) {
            await this.dequeue(0);
            await onFailed(error);
          }
        });
      } else {
        const queue = await this.enqueue(index);
        serviceMethod({
          ...args,
          queue,
        })
          .then(async (response) => {
            await this.dequeue(index);
            await onCompleted(response);
          })
          .catch(async (error) => {
            await this.dequeue(index);
            await onFailed(error);
          });
      }
    } catch (error) {
      this.error.catch(error);
    }
  }
}
