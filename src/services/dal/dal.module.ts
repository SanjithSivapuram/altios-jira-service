import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DalCategoryService } from './category/dal-category.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DalInterceptor } from 'src/common/interceptors/dal.interceptor';
import { DalProjectService } from './project/dal-project.service';
import { DalWorkOrderService } from './work-order/dal-work-order.service';
import { DalWorkOrderTaskService } from './work-order-task/dal-work-order-task.service';

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: DalInterceptor,
        },
        DalCategoryService,
        DalProjectService,
        DalWorkOrderService,
        DalWorkOrderTaskService
    ]
})
export class DalModule { }
