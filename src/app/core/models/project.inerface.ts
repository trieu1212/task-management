export interface IProject {
    id: string
    name: string
    description: string
    ownerId: string
    memberIds: string[]
    createdAt: Date
}