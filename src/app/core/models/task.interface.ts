import { IUser } from "./user.interface"

export interface ITask {
    id: string
    title: string
    description: string
    status: "To Do" | "In Progress" | "Done"
    projectId: string
    assignee: IUser | any
    createdAt: Date
}