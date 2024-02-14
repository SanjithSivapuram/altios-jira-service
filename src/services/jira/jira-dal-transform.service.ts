import { Injectable } from '@nestjs/common';

@Injectable()
export class JiraDALTransformService {

    constructor(

    ) { }

    async transformtoDALWorkOrders(rawData: any) {

        let workOrdersData: any = []
        let count = 101

        for await (let data of rawData?.values) {
            let temp = {
                companyId: 1,
                no: "WO" + count.toString(),
                projectNo: "PRJALTINT",
                departmentNo: "DEP1003",
                title: data?.name,
                description: data?.goal,
                isChangeOrder: false,
                planStartDate: data?.startDate,
                planEndDate: data?.endDate,
                creationDate: data?.createdDate,
                externalId: data?.id.toString(),
                integrationSource: "Jira External"
            }
            count += 1
            workOrdersData.push(temp)
        }

        return workOrdersData;
    }

    async transformtoDALWorkOrderTasks(rawData: any) {
        // console.log("Transform :", rawData)
        let workOrderTasksData: any = []

        for await (let data of rawData?.issues) {
            let workOrderTask = {
                companyId: 1,
                workOrderNo: "",
                categoryNo: "",
                categoryId: data?.fields?.components ? data?.fields?.components[0]?.id : null,
                taskNo: data?.id,
                description: data?.fields?.summary,
                resourceNo: "",
                resourceId: data?.fields?.assignee ? data?.fields?.assignee?.accountId : null,
                status: "New",
                planStartDate: data?.fields?.customfield_10020?.startDate,
                planEndDate: data?.fields?.customfield_10020?.endDate,
                budgetAmount: data?.fields?.aggregatetimespent / 3600,
                budgetRate: 50,
                budgetCost: 50 * (data?.fields?.aggregatetimeoriginalestimate / 3600),
                actualTaskRate: 100,
                totalActualCost: 100 * (data?.fields?.aggregatetimespent / 3600),
                creationDate: data?.fields?.created.split("+")[0],
                externalId: data?.key,
                integrationSource: "Jira External",
                sprintId: data?.fields?.customfield_10020 ? data?.fields?.customfield_10020[0]?.id.toString() : null,
            }
            workOrderTasksData.push(workOrderTask)
        }

        return workOrderTasksData;
    }
}
