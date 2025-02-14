export interface User {

    userId: number;
    username: string;
    role: string;
    isAuthentication: boolean | undefined;
    token: string | undefined;

}