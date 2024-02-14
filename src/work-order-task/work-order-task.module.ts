import { Module } from '@nestjs/common';
import { WorkOrderTaskService } from './work-order-task.service';
import { WorkOrderTaskController } from './work-order-task.controller';
import { JiraModule } from 'src/services/jira/jira.module';
import { HttpModule } from '@nestjs/axios';
import { JiraService } from 'src/services/jira/jira.service';
import { JiraDALTransformService } from 'src/services/jira/jira-dal-transform.service';

@Module({
  imports: [JiraModule, HttpModule],
  controllers: [WorkOrderTaskController],
  providers: [WorkOrderTaskService, JiraService, JiraDALTransformService],
})
export class WorkOrderTaskModule {}
