import { useQuery } from '@tanstack/react-query'
import { Select } from 'antd'
import { type ChangeEvent, type FC } from 'react'
import { instance } from '../hooks'
import { useCookies } from 'react-cookie'

interface CustomSelectType {
    extraClass?:string,
    requestTitle:`/teachers` | "/students" | "/groups" | "/rooms" | "/stacks",
    stackId?:string | number | null,
    queryKey:string,
    setValue:any
    value:any,
    disabled?:boolean
}

const CustomSelect:FC<CustomSelectType> = ({extraClass, requestTitle, stackId , queryKey, setValue, value, disabled}) => {
    const [cookies] = useCookies(['token'])
    const {data = []} = useQuery({
        queryKey:[queryKey, stackId],
        queryFn:() => instance(cookies.token).get(requestTitle, {
            params:stackId ? {stackId} : {}
            // Filter params ozgarishi mumkin
        }).then(res => res.data.data.map((item:any) => {
            const data = {
                label: requestTitle == "/teachers" || requestTitle == "/students" ? `${item.firstName} ${item.lastName}` : `${item.name}`,
                value:item.id
            }
            return data
        }))
    }) 

    function handleChange(e:ChangeEvent<HTMLSelectElement>){
        setValue(e)
    }
    return (
        <Select
            disabled={disabled}
            value={value}
            onChange={handleChange}
            className={`w-70! ${extraClass}`}
            allowClear
            size="large"
            showSearch={{ optionFilterProp: 'label' }}
            placeholder={`Choose ${requestTitle.split("").splice(1).join("")}`}
            options={data}
        />
    )
}

export default CustomSelect