import { Button, Input } from "antd"
import { Caption, CustomSelect, CustomTable, QueryPATH } from "../../../components"
import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { GetAll } from "../../../services";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { debounce } from "../../../hooks";
import { useNavigate } from "react-router-dom";

const Groups = ({ stackId, title }: { stackId?: string, title?: string }) => {
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Stacks name',
      dataIndex: "stackName"
    },
    {
      title: 'Teacher name',
      dataIndex: 'teacherName'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Actions',
      dataIndex: 'actions'
    },
  ];
  const [teacherId, setTeacherId] = useState<number | string | null>(null)
  const [search, setSearch] = useState<string>("")
  const name = debounce(search, 1000)
  const { data = [], isLoading } = GetAll([name], "/groups", cookies.token, QueryPATH.groups, { name })
  const groups = (data ?? []).map((item, index) => ({
    ...item,
    key: index + 1,
    stackName: item.stack?.name,
    teacherName: `${item.teacher?.firstName} ${item.teacher?.lastName}`,
    actions: <Button onClick={() => navigate(`/groups/${item.id}`)} type="primary" icon={<MoreOutlined />} />
  }))
  return (
    <div className="p-5">
      <Caption icon={<PlusCircleOutlined />} count={groups.length} title={`Groups ${title ? title : ""}`} />
      <div className="flex gap-3 my-5">
        <Input onChange={(e) => setSearch(e.target.value)} className="w-70!" size="large" allowClear placeholder="Search group by name" />
        <CustomSelect value={teacherId} setValue={setTeacherId} queryKey={QueryPATH.teachers} stackId={stackId} requestTitle="/teachers" />
      </div>
      <CustomTable loading={isLoading} columns={columns} data={groups} />
    </div>
  )
}

export default Groups