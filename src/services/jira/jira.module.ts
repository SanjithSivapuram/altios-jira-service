import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JiraService } from './jira.service';
import { JiraDALTransformService } from './jira-dal-transform.service';

@Module({
    imports: [
        HttpModule
    ],
    providers: [JiraService, JiraDALTransformService]
})
export class JiraModule { }
