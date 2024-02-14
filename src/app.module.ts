import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssuesModule } from './issues/issues.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './services/redis/redis.module';
import { ProjectModule } from './project/project.module';
import { WorkOrderTaskModule } from './work-order-task/work-order-task.module';
import { WorkOrderModule } from './work-order/work-order.module';
import { DalWorkOrderService } from './services/dal/work-order/dal-work-order.service';
import { HttpModule } from '@nestjs/axios';
import { DalWorkOrderTaskService } from './services/dal/work-order-task/dal-work-order-task.service';
import { DalResourceService } from './services/dal/resource/dal-resource.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    IssuesModule,
    RedisModule,
    ProjectModule,
    WorkOrderTaskModule,
    WorkOrderModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService, DalWorkOrderService, DalWorkOrderTaskService, DalResourceService],
})
export class AppModule { }
