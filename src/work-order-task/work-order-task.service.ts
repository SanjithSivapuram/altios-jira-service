import { Injectable } from '@nestjs/common';
import { CreateWorkOrderTaskDto } from './dto/create-work-order-task.dto';
import { UpdateWorkOrderTaskDto } from './dto/update-work-order-task.dto';
import { JiraService } from 'src/services/jira/jira.service';

@Injectable()
export class WorkOrderTaskService {
  constructor(
    private readonly jiraService: JiraService
  ) {}

  create(createWorkOrderTaskDto: CreateWorkOrderTaskDto) {
    return 'This action adds a new workOrderTask';
  }

  findAll() {
    return `This action returns all workOrderTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workOrderTask`;
  }

  update(id: number, updateWorkOrderTaskDto: UpdateWorkOrderTaskDto) {
    return `This action updates a #${id} workOrderTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} workOrderTask`;
  }

  async syncWorkOrderTasksToAltios(projectName: string, issueType: string) {

    const workOrderTasksData: any = await this.jiraService.findAllIssuesByProject(projectName, issueType);

    // let allIssueDetails : IssueDetails[] = []

    // for await (let issueType of issuesData.issueTypes) {
    //   const issueDeails: IssueDetails = await this.findIssueDetailsByProject(projectName, issueType.id)
    //   allIssueDetails.push(issueDeails)
    // }

    // Create Bulk Work Order

    return workOrderTasksData;
  }
}
