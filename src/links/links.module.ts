import { Module } from '@nestjs/common';
import { LinksService } from './services/links.service';
import { LinksRepository } from './repositories/links.repository';
import { LinksController } from './controllers/links.controller';

@Module({
  providers: [LinksService, LinksRepository],
  controllers: [LinksController]
})
export class LinksModule {}
