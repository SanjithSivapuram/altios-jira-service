import { Module } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { JiraService } from 'src/services/jira/jira.service';
import { JiraModule } from 'src/services/jira/jira.module';
import { HttpModule } from '@nestjs/axios';
import { JiraDALTransformService } from 'src/services/jira/jira-dal-transform.service';

@Module({
  imports: [JiraModule, HttpModule],
  controllers: [IssuesController],
  providers: [IssuesService, JiraService, JiraDALTransformService],
})
export class IssuesModule {}
