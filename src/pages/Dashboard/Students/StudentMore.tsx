import { ArrowLeftOutlined, DeleteFilled, EditFilled } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Modal } from "antd"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { Delete, GetById } from "../../../services"
import { FormatDate, QueryPATH } from "../../../components"

const StudentMore = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cookies] = useCookies(['token'])
  const queryClient = useQueryClient()
  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const { data = {}, isLoading } = GetById(QueryPATH.studentMore, id, cookies.token, "/students")
  const { mutate: StudentDelete, isPending } = Delete("/students", cookies.token, id, navigate, QueryPATH.students, queryClient)

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}> <ArrowLeftOutlined className="text-[25px]" /> </button>
          <h1 className="font-bold text-[25px]"> {isLoading ? "loading..." : `${data.firstName} ${data.lastName}`} </h1>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setDeleteModal(true)} type="primary" danger icon={<DeleteFilled />} />
          <Button onClick={() => navigate("update")} type="primary" icon={<EditFilled />}> Update </Button>
        </div>
      </div>

      <div className="p-5 border mt-5 rounded-xl w-[50%]">
        <ul className="flex flex-col gap-4">
          <li><strong>ID:</strong> {data.id}</li>
          <li><strong>First name:</strong> {data.firstName}</li>
          <li><strong>Last name:</strong> {data.lastName}</li>
          <li><strong>Email:</strong> {data.email}</li>
          <li><strong>Phone:</strong> {data.phone}</li>
          <li><strong>Created at:</strong> {FormatDate(data.createdAt)}</li>
          <li><strong>Updated at:</strong> {FormatDate(data.updatedAt)}</li>
        </ul>
      </div>

      <Modal confirmLoading={isPending} onOk={() => StudentDelete()} open={deleteModal} onCancel={() => setDeleteModal(false)} title="Do you want to delete!" />
    </div>
  )
}

export default StudentMore