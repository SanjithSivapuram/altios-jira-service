import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { JiraService } from 'src/services/jira/jira.service';
import { DalCategoryService } from 'src/services/dal/category/dal-category.service';
import { IssueDetails, JiraIssues } from 'src/services/jira/entities/jira-issues.entity';

@Injectable()
export class IssuesService {
  constructor(
    private readonly jiraService: JiraService,
  ) { }

  create(createIssueDto: CreateIssueDto) {
    return 'This action adds a new issue';
  }

  findAll() {
    return ""
  }

  findOne(id: number) {
    return `This action returns a #${id} issue`;
  }

  update(id: number, updateIssueDto: UpdateIssueDto) {
    return `This action updates a #${id} issue`;
  }

  remove(id: number) {
    return `This action removes a #${id} issue`;
  }

  async findIssuesByProject(projectId: string, issueType: string) {
    return await this.jiraService.findAllIssuesByProject(projectId, issueType);
  }

  async findIssueDetailsByProject(projectId: string, issueId: string) {
    return await this.jiraService.findIssueDetailsByProject(projectId, issueId);
  }

}
