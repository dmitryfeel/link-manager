import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export class Link {
  private readonly id: string;
  private value: string;
  private isActive: boolean;

  constructor(value: string) {
    this.id = uuidv4();
    this.value = value;
    this.isActive = true;
  }

  getId(): string {
    return this.id;
  }

  getValue(): string {
    return this.value;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  setInactive(): void {
    this.isActive = false;;
  }
}

@Injectable()
export class LinksRepository {
  private links: Map<string, Link> = new Map();

  add(value: string): string {
    const link = new Link(value);
    const linkId = link.getId();
    this.links.set(linkId, link);
    return linkId;
  }

  find(id: string): Link | undefined {
    return this.links.get(id);
  }

  setInactive(id: string): void {
    const link = this.links.get(id);
    if (link) {
      link.setInactive();
    }
  }
}
