import { ArrowLeftOutlined, SaveFilled } from "@ant-design/icons"
import { Button, Input } from "antd"
import { useEffect, useState, type SubmitEvent } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Create, GetById, Update } from "../../../services"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import { QueryPATH } from "../../../components"

const StudentCrud = () => {
  const { id } = useParams()
  const [cookies] = useCookies(['token'])
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const { mutate: CreateStudent, isPending } = Create("/students", cookies.token, navigate, queryClient, QueryPATH.students)
  const { mutate: UpdateStudent } = Update("/students", cookies.token, id, navigate, queryClient, QueryPATH.students, QueryPATH.studentMore)

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const data: any = { firstName, lastName, email, phone }

    if (!id || password) {
      data.password = password
    }

    id ? UpdateStudent(data) : CreateStudent(data)
  }

  const { data: singleInfo = {} } = id ? GetById(QueryPATH.studentMore, id, cookies.token, "/students") : {}

  useEffect(() => {
    if (singleInfo && id) {
      setFirstName(singleInfo.firstName)
      setLastName(singleInfo.lastName)
      setEmail(singleInfo.email)
      setPhone(singleInfo.phone)
    }
  }, [singleInfo])

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <button type="button" onClick={() => navigate(-1)}> <ArrowLeftOutlined className="cursor-pointer hover:scale-[1.2] duration-300 text-[25px]" /> </button>
          <h2 className="font-bold text-[25px]"> Student {id ? "update" : "create"} </h2>
        </div>
        <Button loading={isPending} htmlType="submit" icon={<SaveFilled />} size="large" type="primary"> Save </Button>
      </div>

      <div className="flex justify-center gap-5 m-5">
        <div className="w-[45%] flex flex-col gap-5">
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} size="large" placeholder="First name" />
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} size="large" placeholder="Last name" />
        </div>
        <div className="w-[45%] flex flex-col gap-5">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} size="large" placeholder="Email" />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} size="large" placeholder="Phone" />
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} size="large" placeholder="Password" />
        </div>
      </div>
    </form>
  )
}

export default StudentCrud