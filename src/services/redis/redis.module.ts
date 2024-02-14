import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
    imports: [
        CacheModule.registerAsync({
            isGlobal: true,
            useFactory: async () => ({
                store: await redisStore({
                    socket: {
                        host: 'localhost',
                        port: 6379,
                    },
                }),
                ttl: 60
            }),
        })
    ],
    providers: []
})
export class RedisModule { }
