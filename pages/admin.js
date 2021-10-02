import {
  useContext,
  useState,
} from 'react'
import styled from 'styled-components'
import {
  Input,
  Button,
  Table,
  Upload,
} from 'antd'
import { ModalLogin } from '../src/components'
import { HeaderLogo, TitleH3 } from '../src/components/common'
import userContext from '../src/context/userContext'
import { colors } from '../src/configs/color'

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
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <DeleteButton type="primary">Delete</DeleteButton>,
    },
  ]

  const dataList = [
    {
      key: 1,
      id: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      id: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      id: 3,
      name: 'Not Expandable',
      age: 29,
      address: 'Jiangsu No. 1 Lake Park',
      description: 'This not expandable',
    },
    {
      key: 4,
      id: 4,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
  ]

  if (!user.adminData) {
    return (
      <Container>
        <ModalLogin
          visible={!user.adminData && !user.isLoading}
          onFinish={(data) => {
            user.setAdmin(data)
          }}
        />
      </Container>
    )
  }

  const onSearch = () => {

  }

  const handleAction = (uploadfile) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(uploadfile)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

  const handleChange = (info) => {
    let list = [...info.fileList]

    // fileList = fileList.slice(-2)

    list = list.map((file) => {
      if (file.response) {
        file.url = file.response.url
      }
      return file
    })
    setFile(list)
  }

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
          {'The 31th Annual Meeting of The Society of Plastic and Reconstructive Surgeons of Thailand\nThe Society of Aesthetic Plastic Surgeons of Thailand'}
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
          <Button type="primary" style={{ marginLeft: 10 }}>Add Member</Button>
        </Section>
        <Section>
          <span>Select File (.csv)</span>
          <Upload
            accept=".csv"
            action={handleAction}
            className="upload-btn"
            maxCount={1}
            fileList={fileList}
            onChange={handleChange}
          >
            <Button>Upload</Button>
          </Upload>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            disabled={!fileList.length}
          >
            Import
          </Button>
        </Section>
        <Table
          columns={columns}
          dataSource={dataList}
        />
      </Content>
    </div>
  )
}

export default Admin
