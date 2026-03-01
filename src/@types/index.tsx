export interface StackType {
    id: number,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
}
export interface TeacherType {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    stackId: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
}
export interface GroupsType {
    id: number,
    name: string,
    stackId: number,
    teacherId: number,
    startDate: string,
    endDate: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
    stack: StackType,
    teacher: TeacherType,
    students: any[],
    stackName?: string,
    teacherName?:string
}
export interface StudentType {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password?: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null
  }