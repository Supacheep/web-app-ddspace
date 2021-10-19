import {
  useContext,
  useState,
  useEffect,
} from 'react'
import styled from 'styled-components'
import {
  Input,
  Button,
  Table,
  Upload,
  message,
  Popconfirm,
} from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ModalLogin, ModalLoading } from '../../src/components'
import { HeaderLogo, TitleH3 } from '../../src/components/common'
import userContext from '../../src/context/userContext'
import { colors } from '../../src/configs/color'
import ModalRegister from './components/modalRegister'
import { API } from '../../src/configs'

const { Search } = Input

const Container = styled.div`
  background-color: ${colors.themeColor};
  width: 100vw;
  height: 100vh;
`

const Header = styled.div`
  background-color: ${colors.themeColor};
  display: flex;
  align-items: center;
`

const Title = styled(TitleH3)`
  text-align: left;
  margin-left: 50px;
`

const Content = styled.div`
  margin: 10px;
  .upload-btn {
    display: flex;
    margin-left: 10px;
    align-items: center;
    min-width: 300px;
    .ant-upload-list-item {
      margin-top: 0;
      margin-left: 5px;
    }
  }
`

const Section = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`

const DeleteButton = styled(Button)`
  background-color: ${colors.red};
  color: ${colors};
  border: 0;
  :hover,:active {
    background-color: ${colors.red} !important;
  }
`

const LogoContainer = styled.div`
  white-space: nowrap;
`

const Admin = () => {
  const user = useContext(userContext)
  const [fileList, setFile] = useState([])
  const [registerVisible, setRegisterVisible] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [dataList, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [dataLoading, setDataLoading] = useState(false)
  const [dataIndex, setDataIndex] = useState(0)
  const [filter, setFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const router = useRouter()
  const pageSize = 20

  const fetchData = () => {
    setDataLoading(true)
    axios.post(
      `${API}/userprofile/getalluserprofile`,
      {
        index: dataIndex,
        count: pageSize,
        filter,
      },
      {
        headers: {
          AdminToken: user.adminData.adminToken,
        },
      },
    )
      .then((response) => {
        setData(response?.data?.data?.userProfile)
        setTotal(response?.data?.data?.count)
        setDataLoading(false)
      })
      .catch((error) => {
        console.warn(error)
        router.push({
          pathname: '/error',
          query: { status: 'error' },
        })
      })
  }

  useEffect(() => {
    if (user?.adminData?.adminToken) {
      fetchData()
    }
  }, [user?.adminData?.adminToken, dataIndex, filter])

  const deleteUser = (userid) => axios.delete(
    `${API}/userprofile/removeuserprofilebyuserid`,
    {
      headers: {
        AdminToken: user.adminData.adminToken,
      },
      data: { userid },
    },
  )
    .then(() => {
      setRegisterVisible(false)
      message.success('Delete success')
      setDataIndex(0)
      setCurrentPage(0)
      fetchData()
    })
    .catch((error) => {
      console.warn(error)
      setRegisterVisible(false)
      message.error('Delete failed')
    })

  const columns = [
    {
      title: 'No.',
      dataIndex: '',
      key: 'no',
      render: (text, record, index) => <span>{(pageSize * currentPage) + (index + 1)}</span>,
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Lastname', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <Popconfirm
          placement="leftTop"
          onConfirm={() => deleteUser(record.id)}
          title="Are you sure to delete this member ?"
          okText="Yes"
          cancelText="No"
        >
          <DeleteButton
            type="primary"
          >
            Delete
          </DeleteButton>
        </Popconfirm>
      ),
    },
  ]

  const loginAdmin = async (data) => {
    setIsLoading(true)
    try {
      const loginUser = await axios.post(`${API}/adminsession/adminlogin`, data)
      const adminToken = loginUser?.data?.data?.token
      setIsLoading(false)
      if (adminToken) {
        user.setAdmin({ ...data, adminToken })
      } else {
        setErrorMsg(loginUser?.data?.data?.message || 'Login failed')
      }
    } catch (err) {
      setIsLoading(false)
      setErrorMsg(err?.response?.data?.error?.message || 'Login failed')
    }
  }

  if (!user.adminData) {
    return (
      <Container>
        <ModalLogin
          visible={!user.adminData}
          onFinish={loginAdmin}
          error={errorMsg}
        />
        {isLoading && <ModalLoading />}
      </Container>
    )
  }

  const onSearch = (val) => {
    setDataIndex(0)
    setCurrentPage(0)
    setFilter(val)
  }

  const handleChange = (info) => {
    let list = [...info.fileList]
    if (info?.file?.response && info?.file?.response?.success) {
      message.success('Upload success')
      setDataIndex(0)
      setCurrentPage(0)
      fetchData()
      return setFile([])
    }

    if (info?.file?.status !== 'removed' && info?.file?.response && !info?.file?.response?.success) {
      message.error(info?.file?.response?.error?.message || 'Register failed')
    }

    list = list.map((file) => {
      const returnFile = file
      if (returnFile.response) {
        returnFile.url = returnFile.response.url
      }
      return returnFile
    })
    return setFile(list)
  }

  const register = (data) => axios.post(
    `${API}/userprofile/register`,
    data,
    {
      headers: {
        AdminToken: user.adminData.adminToken,
      },
    },
  )
    .then(() => {
      setRegisterVisible(false)
      message.success('Register success')
      setDataIndex(0)
      setCurrentPage(0)
      fetchData()
    })
    .catch((error) => {
      console.warn(error)
      setRegisterVisible(false)
      message.error('Register failed')
    })

  return (
    <div>
      <Header>
        <LogoContainer>
          <HeaderLogo
            src="/images/LogoThPRS-01.svg"
            alt="LogoThPRS"
          />
          <HeaderLogo
            src="/images/LogoThSAPS_whole.svg"
            alt="LogoThPRS"
          />
        </LogoContainer>
        <Title style={{ color: colors.white }}>
          31
          <sup>st</sup>
          {' '}
          Annual meeting of ThPRS & ThSAPS
        </Title>
      </Header>
      <Content>
        <Search
          placeholder="search"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          style={{ width: 500 }}
        />
        <Section>
          <span>Member Profile</span>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={() => setRegisterVisible(true)}
          >
            Add Member
          </Button>
        </Section>
        <Section>
          <span>Select File (.csv)</span>
          <Upload
            accept=".csv"
            action={`${API}/userprofile/multipleregister`}
            headers={{
              AdminToken: user.adminData.adminToken,
            }}
            className="upload-btn"
            maxCount={1}
            fileList={fileList}
            onChange={handleChange}
          >
            <Button>Upload</Button>
          </Upload>
        </Section>
        <Table
          columns={columns}
          dataSource={dataList}
          onChange={(pagination) => {
            setCurrentPage(pagination.current)
            setDataIndex((pagination.current - 1) * (pageSize))
          }}
          pagination={{
            total,
            pageSize,
          }}
          loading={dataLoading}
        />
      </Content>
      <ModalRegister
        visible={registerVisible}
        onClose={() => setRegisterVisible(false)}
        onFinish={register}
      />
    </div>
  )
}

export default Admin
