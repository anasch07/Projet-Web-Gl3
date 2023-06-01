import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ContentService } from './content.service';
import { Content } from './entities/content.entity';

@Controller('content')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('Courses')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('/')
  async findAllContents(): Promise<Content[]> {
    return await this.contentService.findAllContent();
  }
}
