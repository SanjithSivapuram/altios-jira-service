import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Cache } from 'cache-manager';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class DalWorkOrderService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly httpService: HttpService
    ) { }

    async pushBulkWorkOrders(companyId: number, workOrderData: any) {
        const token: any = await this.cacheManager.get('DAL_token');
        // console.log(token)
        const { data } = await lastValueFrom(
            this.httpService.post<any>(`https://altiosdevdata.azurewebsites.net/api/WorkOrder/Bulk/${companyId}`, workOrderData, { headers: { Authorization: `Bearer ${token}` } }).pipe(
                catchError((error: AxiosError) => {
                    throw `DAL Post Work Orders Issue ${error.message}`;
                }),
            ),
        );
    }

    async findAllWorkOrders(companyId: number, dictForm?: boolean) {
        const token: any = await this.cacheManager.get('DAL_token');
        // console.log(token)
        const { data } = await lastValueFrom(
            this.httpService.get<any>(`https://altiosdevdata.azurewebsites.net/api/WorkOrder/${companyId}`, { headers: { Authorization: `Bearer ${token}` } }).pipe(
                catchError((error: AxiosError) => {
                    throw `DAL Work Orders Issue ${error.message}`;
                }),
            ),
        );

        let finalData = dictForm ? {} : []

        if (dictForm) {
            for (let workOrder of data) {
                finalData[workOrder?.externalId] = workOrder.no
            }
        }
        else {
            finalData = data
        }

        return finalData;
    }
}
