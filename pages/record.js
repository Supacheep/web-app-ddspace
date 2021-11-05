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
    opacity: 0.8;
  }

  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-more, .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-more {
    position: relative;
    padding: 8px 16px;
    background: transparent;
    border: 0;
    display: none;
  }

  .ant-tabs-tab-active  {
    opacity: 1;
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
  display: block;
  align-items: flex-start;

  @media screen and (max-width: ${MOBILE_WINDOW_WIDTH}px) {
    display: block;
  }
`

const ContentTitle = styled.h3`
  white-space: nowrap;
  margin: 0;
`

const ContentTopic = styled.h3`
  margin: 0;
`

const ContentDescription = styled.div`
  margin: 0 15px;
  white-space: pre-wrap;
  margin-left: 0;

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
          topic: 'Welcome Speech - Plenary Lecture1 Facial Reanimation - Maximizing Aesthetic and Functional Results',
          // eslint-disable-next-line max-len
          description: 'President of the Society of Plastic and Reconstructive Surgeons of Thailand &President of the Society of Aesthetic Plastic Surgeons of Thailand\nZachary Moaveni, MD (New Zealand)\nModerator: Apirag Chuangsuwanich, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY1/Welcom+Speech+-+Plenary+Lecture1+Facial+Reanimation.mp4',
        },
        {
          topic: 'The 12th Lim Koonvisarn Memorial Lecture',
          description: 'Montri Kitmanee, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY1/The+12+Lim+Koonvisarn+Memorial+Lecture.mp4',
        },
        {
          topic: 'Outstanding Plastic Surgeon 2021',
          description: 'Vichai Srimuninnimit, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY1/Outstanding+Plastic+Surgeon+2021.mp4',
        },
        {
          topic: 'Support Sym1 A Major Breakthrough towards Improved Biocompatibility (Supported by Motiva)',
          description: 'Marcos Sforza, MD (UK)\nVisnu Lohsiriwat, MD\nModerator: Sorawuth Chu-Ongsakul, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY1/Support+Sym1+A+Major+Breakthrough+towards+Improved+Biocompatibility+++(Supported+by+Motiva).mp4',
        },
        {
          topic: 'Special Lecture1',
          description: 'Clinical Experience with Joy by Motiva\nManuel Chacon, MD (Costa Rica)\nModerator: Thiti Tantitham, MD(Supported by Motiva)',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY1/Special+Lecture1+%E2%80%93+Clinical+Experieience+with+Joy+by+Motiva.mp4',
        },
        {
          topic: 'ประชุมใหญ่สามัญประจำปีของสมาชิกทุกท่าน รับข้อเสนอและตอบคำถาม โดยท่านนายกฯ2 สมาคมฯ',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY1/14-00_15-00+Annual+General+Meeting.mp4',
        },
        {
          topic: 'S1 Burn',
          // eslint-disable-next-line max-len
          description: '- The Recent Update in Burn Resuscitation\nTanasit Kangkorn, MD\n- Novel Imaging for Prediction of Burn Depth\nBowornsilp Chowchuen, MD\n- What Do We Need to Know about Sepsis in Burns?\nSuparerk Laohapitakworn, MD\n- Impact of Covid-19 in Burns. The Experience from Chulalongkorn Hospital\nApichai Angspatt, MD\n- Q&A 8 min\nModerator: Vichai Srimuninnimit, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY1/Watergate+Ballroom+B%26C/S1+Burn+(13+min).mp4',
        },
        {
          topic: 'S3 Facial Rejuvenation',
          // eslint-disable-next-line max-len
          description: '- Surgical vs Non-Surgical Facelift\nKanit Wittayavanichai, MD\n- Doing Thread Lift: The Plastic Surgeon\'s Way\nApirag Chuangsuwanich, MD\n- Non-Invasive Lifting Modalities\nMarisa Pongprutthipan, MD\n-Deoxycholic Acid: Clinical Trial for Fat Contouring\nRuch Wongtrungkapun, MD\nModerator: Seree Iamphongsai, MD\n- The Evolution of Dorsal Augmentation with Super Fine Diced Cartilage\nSurawej Numhom, MD\n- Strategy for Septal Straightening\nMontien Lueprapai, MD\n-Open Rhinoplasty with Diced Cartilage, Pitfalls and Complications; My Experience\nSomboon Waiprib, MD\nModerator: Kidakorn Kiranantawat, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY1/Watergate+Ballroom+B%26C/S3+Facial+Rejuvenation.mp4',
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
    {
      title: 'Thursday, 29 OCTOBER 2021',
      titleColor: '#5A9CD6',
      lists: [
        {
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Suradej.mp4',
        },
      ],
    },
  ],
  [
    {
      title: 'Wednesday, 27 OCTOBER 2021',
      titleColor: '#538136',
      lists: [
        {
          topic: 'S2: Anesthesia for Ambulatory Plastic Surgery',
          // eslint-disable-next-line max-len
          description: '- Safe Office-Based Anesthesia\nPaweena Paarporn, MD\n- Safe sedation for Plastic Surgeons\nPannika Worapaluek, MD\n- Risk Management in Private Practice: Personal Experience\nKamol Pansritum, MD\nModerator: Kamol Wattanakrai, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY1/Watergate+Ballroom+A/S2+Anesthesia+for+Ambulatory+Plastic+Surgery.mp4',
        },
        {
          topic: 'S4: Rhinoplasty',
          // eslint-disable-next-line max-len
          description: '- The Evolution of Dorsal Augmentation with Super Fine Diced Cartilage\nSurawej Numhom, MD\n- Strategy for Septal Straightening\nMontien Lueprapai, MD\n-Open Rhinoplasty with Diced Cartilage, Pitfalls and Complications; My Experience\nSomboon Waiprib, MD\nModerator: Kidakorn Kiranantawat, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY1/Watergate+Ballroom+A/S4+Rhinoplasty.mp4',
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
    {
      title: 'Thursday, 29 OCTOBER 2021',
      titleColor: '#5A9CD6',
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
              renderItem={(list) => (
                <ListItem>
                  <div>
                    <ContentTopic>{list.topic}</ContentTopic>
                    <Content>
                      <ContentDescription>{list.description}</ContentDescription>
                    </Content>
                  </div>
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
