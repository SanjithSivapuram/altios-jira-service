import { HttpService } from '@nestjs/axios';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Observable, catchError, lastValueFrom, of } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class DalInterceptor implements NestInterceptor {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly httpService: HttpService
    ) { }
    async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
        // console.log("Intercept")
        let cachedDalToken = await this.cacheManager.get('DAL_token');
        // await this.cacheManager.reset()
        // console.log(cachedDalToken)
        if (!cachedDalToken) {
            console.log("Not In Cache")
            await this.generateDalToken()
        }
        return next.handle();
    }

    async generateDalToken(): Promise<any> {
        let userData = {
            userName: process.env.DAL_EMAIL,
            password: process.env.DAL_PASSWORD
        }
        console.log(userData)
        const { data } = await lastValueFrom(
            this.httpService.post<any>('https://altiosdevdata.azurewebsites.net/api/Security/Login', userData).pipe(
                catchError((error: AxiosError) => {
                    throw `DAL Login Issue ${error.message}`;
                }),
            ),
        );
        
        await this.cacheManager.set('DAL_token', data?.value);
    }
}