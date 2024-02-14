import { Injectable } from "@nestjs/common";
import { UserCtx } from "./user-context.entity";

@Injectable()
export class UserContext {
    userContext: UserCtx
    constructor() {}

    setUserContext(userData: UserCtx) {
        this.userContext = userData
    }

    getUserContext(): UserCtx {
        return this.userContext;
    }

    getDalToken() {
        return this.userContext.dalToken;
    }
}