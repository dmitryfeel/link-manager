import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { LinksService } from '../services/links.service';
import { HOST } from 'src/common/main-config.config';
import { AddLinkType, GetLinkValueType } from '../types/links.type';
import { LinksExceptions } from '../exceptions/links.exceptiions';

@Controller('link')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  addLink(@Body('value') value: string): AddLinkType {
    const id = this.linksService.addLink(value);
    return { linkUrl: `${HOST}/link/${id}` };
  }

  @Get(':id')
  getLinkValue(@Param('id') id: string): GetLinkValueType {
    try {
      const value = this.linksService.getLinkValue(id);
      return { value };
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw new Error(LinksExceptions.getLinkValueError())
      }
      throw error;
    }
  }
}
