import { Injectable } from '@nestjs/common';
import { CreateWorkOrderDto } from './dto/create-work-order.dto';
import { UpdateWorkOrderDto } from './dto/update-work-order.dto';
import { JiraService } from 'src/services/jira/jira.service';
import { DalWorkOrderService } from 'src/services/dal/work-order/dal-work-order.service';
import { DalWorkOrderTaskService } from 'src/services/dal/work-order-task/dal-work-order-task.service';
import { DalResourceService } from 'src/services/dal/resource/dal-resource.service';
import { DalCategoryService } from 'src/services/dal/category/dal-category.service';

@Injectable()
export class WorkOrderService {
  constructor(
    private readonly jiraService: JiraService,
    private readonly dalWorkOrderService: DalWorkOrderService,
    private readonly dalWorkOrderTaskService: DalWorkOrderTaskService,
    private readonly dalResourceService: DalResourceService,
    private readonly dalCategoryService: DalCategoryService,
  ) { }

  create(createWorkOrderDto: CreateWorkOrderDto) {
    return 'This action adds a new workOrder';
  }

  findAll() {
    return `This action returns all workOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workOrder`;
  }

  update(id: number, updateWorkOrderDto: UpdateWorkOrderDto) {
    return `This action updates a #${id} workOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} workOrder`;
  }

  async syncWorkOrderToAltios(projectName: string) {

    const projectBoardId = await this.jiraService.getBoardDataByProject(projectName)
    const workOrderData: any = await this.jiraService.getSprintsDataByProject(projectBoardId);

    // push to DAL Layer
    // console.log(workOrderData)
    // await this.dalWorkOrderService.pushBulkWorkOrders(1, workOrderData);

    // get latest work orders from DAL Layer for ids using dictionary
    const workOrderFromDAL = await this.dalWorkOrderService.findAllWorkOrders(parseInt(process.env.companyID), true);

    // get company resources data
    const resourceData = await this.dalResourceService.getResourceDetails(1);

    //get company categories data
    const categoryData = await this.dalCategoryService.findAllCategories();

    const workOrderTasks: any = await this.jiraService.findAllIssuesByProject(projectName, "Sub-Task")

    let finalWorkOrderTasks = []

    for await (let workOrderTask of workOrderTasks) {
      let tempData = {
        ...workOrderTask,
        workOrderNo: workOrderFromDAL[workOrderTask?.sprintId],
        resourceNo: resourceData[workOrderTask?.resourceId],
        categoryNo: categoryData[workOrderTask?.categoryId]
      }

      delete tempData?.sprintId;
      delete tempData?.categoryId;
      delete tempData?.resourceId;
      
      finalWorkOrderTasks.push(tempData);
    }

    // Push Work Order Tasks to DAL layer
    // await this.dalWorkOrderTaskService.pushBulkWorkOrdersTasks(1, finalWorkOrderTasks);

    return finalWorkOrderTasks;
  }
}
