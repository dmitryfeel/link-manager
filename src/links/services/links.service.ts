import { Injectable, NotFoundException } from '@nestjs/common';
import { LinksRepository } from '../repositories/links.repository';
import { LinksExceptions } from '../exceptions/links.exceptiions';

@Injectable()
export class LinksService {
  constructor(private readonly linksRepository: LinksRepository) {}

  addLink(value: string): string {
    return this.linksRepository.add(value);
  }

  getLinkValue(id: string): string {
    const link = this.linksRepository.find(id);
    
    if (link?.getIsActive()) {
      this.linksRepository.setInactive(id);
      return link.getValue();
    }

    throw new NotFoundException(LinksExceptions.getLinkNotFoundOrAlreadyIsActiveError());
  }
}
