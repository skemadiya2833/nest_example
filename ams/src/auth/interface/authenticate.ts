import { User } from "src/user/user.entity";

export interface IAuthenticate {
    readonly user: User ;
    readonly token: string ;
}