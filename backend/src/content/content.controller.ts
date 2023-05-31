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
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';
import { ContentQuery } from './content.query';
import { ContentService } from './content.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('content')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('Courses')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
  ) {}

  @Get('/')
  async findAllContents(): Promise<Content[]> {
    return await this.contentService.findAllContent();
  }
}
