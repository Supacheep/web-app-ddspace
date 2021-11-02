import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Tabs, List, Button } from 'antd'
import { MobileLayout, VideoPlayer } from '../src/components'
import { colors } from '../src/configs/color'
import { MOBILE_WINDOW_WIDTH } from '../src/constants/constantsValue'

const { TabPane } = Tabs

const H1 = styled.h1`
  text-align: center;
  color: ${colors.white};
  padding: 20px;
`

const Container = styled.div`
  margin: 15px;
  .ant-tabs-nav {
    margin: 0;
  }
  .ant-tabs-nav::before {
    border: 0;
  }
  .ant-tabs-tab {
    border-radius: 10px 10px 0 0;
  }
`

const CustomTab = styled(TabPane)`
  background-color: ${colors.white};
  min-height: 60vh;
  padding: 10px;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`

const Title = styled.div`
  background-color: ${colors.themeColor};
  padding: 5px 10px;
  border-radius: 6px;
  color: ${colors.white};
  display: inline-block;
  font-size: 18px;
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`

const ListItem = styled(List.Item)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: ${MOBILE_WINDOW_WIDTH}px) {
    display: block;
  }
`

const Content = styled.div`
  display: flex;
  align-items: flex-start;

  @media screen and (max-width: ${MOBILE_WINDOW_WIDTH}px) {
    display: block;
  }
`

const ContentTitle = styled.h3`
  white-space: nowrap;
  margin: 0;
`

const ContentDescription = styled.div`
  margin: 0 15px;

  @media screen and (max-width: ${MOBILE_WINDOW_WIDTH}px) {
    margin: 10px 0;
  }
`

const ListContent = styled.div`
  margin: 5px 0;
`

const ButtonContainer = styled.div`
  @media screen and (max-width: ${MOBILE_WINDOW_WIDTH}px) {
    text-align: end;
  }
`

const data = [
  [
    {
      title: 'Wednesday, 27 OCTOBER 2021',
      titleColor: '#538136',
      lists: [
        {
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Suradej.mp4',
        },
        {
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Suradej.mp4',
        },
      ],
    },
    {
      title: 'Thursday, 28 OCTOBER 2021',
      titleColor: '#C45911',
      lists: [
        {
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Suradej.mp4',
        },
        {
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Suradej.mp4',
        },
      ],
    },
  ],
  [
    {
      title: 'Wednesday, 27 OCTOBER 2021',
      titleColor: '#5A9CD6',
      lists: [
        {
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Suradej.mp4',
        },
        {
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Suradej.mp4',
        },
      ],
    },
    {
      title: 'Thursday, 28 OCTOBER 2021',
      titleColor: '#C45911',
      lists: [
        {
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Suradej.mp4',
        },
      ],
    },
  ],
]

const isNumeric = (value) => /^\d+$/.test(value)

const Record = () => {
  const router = useRouter()
  console.log('router.query::', router.query)
  const { conference = '1' } = router.query
  const [videoVisible, setVisible] = useState(false)
  const [video, setVideo] = useState('')
  const [activedTab, setActiveTab] = useState(isNumeric(conference) && conference <= data.length ? conference : '1')
  const onChange = (key) => {
    setActiveTab(key)
  }

  const renderList = (listItems) => (
    <>
      {
        listItems.map((item) => (
          <ListContent>
            <Title style={{ backgroundColor: item.titleColor }}>{item.title}</Title>
            <List
              size="large"
              dataSource={item.lists}
              renderItem={(list, index) => (
                <ListItem>
                  <Content>
                    <ContentTitle>{`keynote lecture ${index + 1}:`}</ContentTitle>
                    <ContentDescription>{list.description}</ContentDescription>
                  </Content>
                  <ButtonContainer>
                    <Button
                      type="primary"
                      onClick={() => {
                        setVideo(list.video)
                        setVisible(true)
                      }}
                    >
                      Watching
                    </Button>
                  </ButtonContainer>
                </ListItem>
              )}
            />
          </ListContent>
        ))
      }
    </>
  )

  return (
    <MobileLayout>
      <H1>{`CONFERENCE HALL ${activedTab}`}</H1>
      <Container>
        <Tabs defaultActiveKey={activedTab} type="card" onChange={onChange}>
          {
            data.map((item, index) => (
              <CustomTab tab={`CONFERENCE HALL ${index + 1}`} key={`${index + 1}`}>
                {renderList(item)}
              </CustomTab>
            ))
          }
        </Tabs>
      </Container>
      {video && (
        <VideoPlayer
          src={video}
          visible={videoVisible}
          onCancel={() => {
            setVisible(false)
            setVideo('')
          }}
        />
      )}
    </MobileLayout>
  )
}

export default Record
