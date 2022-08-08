

export interface Ipost{
    id?:number,
    title:string,
    message:string,
    comments: Icomment[]
}

export interface Icomment{
    id?: number,
    message:string,
    fkPostId: number
}
