import { Result, Button } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Error = () => {
  const router = useRouter()
  const { status } = router.query
  return (
    <Result
      status={status || 500}
      title={status || 500}
      subTitle="Sorry, something went wrong."
      extra={<Link href={{ pathname: '/' }}><Button type="primary">Back Home</Button></Link>}
    />
  )
}

export default Error
