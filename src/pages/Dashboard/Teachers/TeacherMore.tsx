import { ArrowLeftOutlined, DeleteFilled, EditFilled } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Modal } from "antd"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { Delete, GetById, GetAll } from "../../../services"
import { CustomTable, FormatDate, QueryPATH } from "../../../components"

const TeacherMore = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])
  const queryClient = useQueryClient()
  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const { data = {}, isLoading } = GetById(QueryPATH.teacherMore, id, cookies.token, "/teachers")
  const { data: groups = [], isLoading: groupsLoading } = GetAll([], `/teachers/${id}/groups`, cookies.token, QueryPATH.groups)
  const { mutate: TeacherDelete, isPending } = Delete("/teachers", cookies.token, id, navigate, QueryPATH.teachers, queryClient)

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Start Date", dataIndex: "startDate" },
    { title: "End Date", dataIndex: "endDate" },
  ]

  const groupData = (groups ?? []).map((item, index) => ({
    ...item,
    key: index + 1,
    startDate: FormatDate(item.startDate),
    endDate: FormatDate(item.endDate),
    name: (
      <span
        onClick={() => navigate(`/groups/${item.id}`)}
        className="cursor-pointer text-blue-500"
      >
        {item.name}
      </span>
    )
  }))

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-[25px] duration-300 hover:scale-[1.2] cursor-pointer"> <ArrowLeftOutlined /> </button>
          <h1 className="font-bold text-[25px]"> {isLoading ? "loading..." : `${data.firstName} ${data.lastName}`} </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setDeleteModal(true)} size="large" className="bg-red-500!" type="primary" icon={<DeleteFilled />} />
          <Button onClick={() => navigate('update')} icon={<EditFilled />} size="large" type="primary"> Update </Button>
        </div>
      </div>

      <div className="p-5 mb-10 flex justify-between border mt-5 border-slate-400 rounded-xl w-[50%]">
        <ul className="flex flex-col gap-5">
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">ID</span>
            <strong>{data.id}</strong>
          </li>

          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">First Name</span>
            <strong>{data.firstName}</strong>
          </li>

          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Last Name</span>
            <strong>{data.lastName}</strong>
          </li>

          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Email</span>
            <strong>{data.email}</strong>
          </li>
        </ul>

        <ul className="flex flex-col gap-5">
          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Phone</span>
            <strong>{data.phone}</strong>
          </li>

          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Stack</span>
            <strong>{data?.stack?.name}</strong>
          </li>

          <li className="flex flex-col">
            <span className="text-[10px] text-slate-400">Created At</span>
            <strong>{FormatDate(data.createdAt)}</strong>
          </li>
        </ul>
      </div>
      <CustomTable loading={groupsLoading} columns={columns} data={groupData} />
      <Modal confirmLoading={isPending} onOk={() => TeacherDelete()} open={deleteModal} onCancel={() => setDeleteModal(false)} title="Do you want to delete!" />
    </div>
  )
}

export default TeacherMore