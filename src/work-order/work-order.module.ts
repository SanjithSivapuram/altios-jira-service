import { Module } from '@nestjs/common';
import { WorkOrderService } from './work-order.service';
import { WorkOrderController } from './work-order.controller';
import { JiraModule } from 'src/services/jira/jira.module';
import { HttpModule } from '@nestjs/axios';
import { JiraService } from 'src/services/jira/jira.service';
import { JiraDALTransformService } from 'src/services/jira/jira-dal-transform.service';
import { DalWorkOrderService } from 'src/services/dal/work-order/dal-work-order.service';
import { DalWorkOrderTaskService } from 'src/services/dal/work-order-task/dal-work-order-task.service';

@Module({
  imports: [JiraModule, HttpModule],
  controllers: [WorkOrderController],
  providers: [WorkOrderService, JiraService, JiraDALTransformService, DalWorkOrderService, DalWorkOrderTaskService],
})
export class WorkOrderModule {}
