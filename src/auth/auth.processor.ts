import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('auth')
export class AuthProcessor {
  private readonly logger = new Logger(AuthProcessor.name);

  @Process('transcodeAuthLogin')
  handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
  }
}
