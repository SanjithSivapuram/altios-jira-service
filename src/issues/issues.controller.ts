import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) { }

  @Post()
  create(@Body() createIssueDto: CreateIssueDto) {
    return this.issuesService.create(createIssueDto);
  }

  @Get()
  findAll() {
    return this.issuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issuesService.update(+id, updateIssueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.issuesService.remove(+id);
  }

  @Get('/project/:projectId/:issueType')
  async findIssuesByProject(@Param('projectId') projectId: string, @Param('issueType') issueType: string) {
    return await this.issuesService.findIssuesByProject(projectId, issueType);
  }

  @Get('/details/project/:projectId/:issueId')
  async findIssueDetailsByProject(@Param('projectId') projectId: string, @Param('issueId') issueId: string) {
    return await this.issuesService.findIssueDetailsByProject(projectId, issueId);
  }

}
