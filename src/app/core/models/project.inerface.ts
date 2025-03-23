import { IUser } from "./user.interface"

export interface IProject {
    id: string
    name: string
    description: string
    ownerId: string
    members: IUser[]
    createdAt: Date
}