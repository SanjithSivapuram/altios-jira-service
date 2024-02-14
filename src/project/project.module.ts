import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DalProjectService } from 'src/services/dal/project/dal-project.service';
import { HttpModule } from '@nestjs/axios';
import { DalModule } from 'src/services/dal/dal.module';

@Module({
  imports: [HttpModule, DalModule],
  controllers: [ProjectController],
  providers: [ProjectService, DalProjectService],
})
export class ProjectModule {}
