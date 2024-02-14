import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Cache } from 'cache-manager';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class DalWorkOrderTaskService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly httpService: HttpService
    ) { }

    async pushBulkWorkOrdersTasks(companyId: number, workOrderTaskData: any) {
        const token: any = await this.cacheManager.get('DAL_token');
        // console.log(token)
        const { data } = await lastValueFrom(
            this.httpService.post<any>(`https://altiosdevdata.azurewebsites.net/api/WorkOrderTask/Bulk/${companyId}`, workOrderTaskData, { headers: { Authorization: `Bearer ${token}` } }).pipe(
                catchError((error: AxiosError) => {
                    throw `DAL Post Work Orders Issue ${error}`;
                }),
            ),
        );
    }
}
