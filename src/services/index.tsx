import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { instance } from "../hooks"
import toast from "react-hot-toast"
import type { NavigateFunction } from "react-router-dom"

export const GetAll = (filerProp: any[], URL: string, token: string, QueryPathname: string, params?: any) => {
    const data = useQuery<any[]>({
        queryKey: [QueryPathname, [...filerProp]],
        queryFn: () => instance(token).get(URL, {
            params: params ? params : {}
        }).then(res => res.data.data)
    })
    return data
}
export const GetById = (QueryPathname: string, id: string | undefined, token: string, URL: string) => {
    const data = useQuery(({
        queryKey: [QueryPathname, id],
        queryFn: () => instance(token).get(`${URL}/${id}`).then(res => res.data.data),
    }))
    return data
}
export const Delete = (URL: string, token: string, id: string | undefined, navigate: NavigateFunction, QueryPathname: string, queryClient: QueryClient) => {
    const data = useMutation({
        mutationFn: () => instance(token).delete(`${URL}/${id}`),
        onSuccess: () => {
            toast.success("Successfully deleted!")
            setTimeout(() => {
                navigate(-1)
                queryClient.invalidateQueries({ queryKey: [QueryPathname] })
            }, 1000)
        },
        onError: err => toast.error(err.message)
    })
    return data
}
export const Create = (URL: string, token: string, navigate: NavigateFunction, queryClient: QueryClient, QueryPathname: string) => {
    const data = useMutation({
        mutationFn: (body: any) => instance(token).post(URL, body),
        onSuccess: () => {
            toast.success("Successfully created!")
            setTimeout(() => {
                navigate(-1)
                queryClient.invalidateQueries({ queryKey: [QueryPathname] })
            }, 1000)
        },
        onError: (err) => toast.error(err.message)
    })
    return data
}
export const Update = (URL:string, token:string, id:string | undefined, navigate:NavigateFunction, queryClient:QueryClient, QueryPathname1:string, QueryPathname2:string) => {
    const data = useMutation({
        mutationFn: (body:any) => instance(token).patch(`${URL}/${id}`, body),
        onSuccess: () => {
            toast.success("Successfully updated!")
            setTimeout(() => {
                navigate(-1)
                queryClient.invalidateQueries({ queryKey: [QueryPathname1] })
                queryClient.invalidateQueries({ queryKey: [QueryPathname2] })
            }, 1000)
        },
        onError: (err) => toast.error(err.message)
    })
    return data
}