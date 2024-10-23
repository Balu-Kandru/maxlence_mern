export interface AuthResponse {
    data : LogInData
}

export interface ActionsResponse {
    data : Action[];
}

interface LogInData {
    accesToken: string;
    user: User;
    roles: Role[]
    actions: Action[]
}

export interface Action {
    id: number,
    name: string
}

interface Role {
    id: number,
    name: number
}

interface User {
    id: number;
    name: string;
    email: string;
    profilePic: string;
    isValidated: boolean;

    createdAt: string;
    updatedAt: string;
}