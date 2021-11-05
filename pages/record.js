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
          topic: 'S1: Burn',
          // eslint-disable-next-line max-len
          description: '- The Recent Update in Burn Resuscitation\nTanasit Kangkorn, MD\n- Novel Imaging for Prediction of Burn Depth\nBowornsilp Chowchuen, MD\n- What Do We Need to Know about Sepsis in Burns?\nSuparerk Laohapitakworn, MD\n- Impact of Covid-19 in Burns. The Experience from Chulalongkorn Hospital\nApichai Angspatt, MD\n- Q&A 8 min\nModerator: Vichai Srimuninnimit, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY1/Watergate+Ballroom+B%26C/S1+Burn+(13+min).mp4',
        },
        {
          topic: 'S3: Facial Rejuvenation',
          // eslint-disable-next-line max-len
          description: '- Surgical vs Non-Surgical Facelift\nKanit Wittayavanichai, MD\n- Doing Thread Lift: The Plastic Surgeon\'s Way\nApirag Chuangsuwanich, MD\n- Non-Invasive Lifting Modalities\nMarisa Pongprutthipan, MD\n-Deoxycholic Acid: Clinical Trial for Fat Contouring\nRuch Wongtrungkapun, MD\nModerator: Seree Iamphongsai, MD\n- The Evolution of Dorsal Augmentation with Super Fine Diced Cartilage\nSurawej Numhom, MD\n- Strategy for Septal Straightening\nMontien Lueprapai, MD\n- Open Rhinoplasty with Diced Cartilage, Pitfalls and Complications; My Experience\nSomboon Waiprib, MD\nModerator: Kidakorn Kiranantawat, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY1/Watergate+Ballroom+B%26C/S3+Facial+Rejuvenation.mp4',
        },
      ],
    },
    {
      title: 'Thursday, 28 OCTOBER 2021',
      titleColor: '#C45911',
      lists: [
        {
          topic: 'Plenary Lecture2: Tips and Tricks for Better Rhinoplasty Results',
          description: 'Man Koon Suh, MD (South Korea)\nModerator: Apichai Angspatt, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY2/Day2+-+Plenary+Lecture2+Tips.mp4',
        },
        {
          topic: 'S5: Reconstructive Microsurgery and Lymphatic Surgery I',
          description: '- Facial Paralysis Clinic, the Past, Present, and Future\nSupasid Jirawatnotai, MD\n- Applying the Low-Cost Augmented Reality in Microsurgery\nNattcha Yodrabum, MD\n- Propeller Flap\nWarangkana Tonaree, MD\nModerator: Kidakorn Kiranantawat, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY2/+Watergate+Ballroom+B%26C/Day2+-+S5.mp4',
        },
        {
          topic: 'S7: Orthognathic Surgery, Facial Contouring',
          description: '- Malar Reduction\nSuthat Koonnawarote, MD\n- Mandibular Angle Reduction\nSuthat Koonnawarote, MD\n- Genioplasty\nSurakit Visuttiwattanakorn, MD\n- Gonioplasty\nSurakit Visuttiwattanakorn, MD \n- Supraperiosteum Chin Augmentation\n(Personal Technique)\nChanchai Sajjaissariyawut, MD\nModerator: Seree Iamphongsai, MD ',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY2/+Watergate+Ballroom+B%26C/Day2+-+S7.mp4',
        },
        {
          topic: 'Support Sym2: Structured Approach in Breast Implant Selection: Evidence Based & Surgical Experience ',
          description: 'Paul Harris,MD  (UK)   (Supported by J&J)\nModerator: Visnu Lohsiriwat, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY2/Day+2+-+Support+Sym2.mp4',
        },
        {
          topic: 'Special Lecture2: Bottoming Out: Defining the Problem, Risk Factors & Correction (Supported by J&J)',
          description: 'Paul Harris,MD  (UK)',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY2/Day2+-+Special+Lecture2+Bottoming+Out.mp4',
        },
        {
          topic: 'S9: CAS, CAD/CAM & 3D Technology',
          description: '- How to Start 3D Printing Lab for Medical Services and Education\nTanasit Kangkorn, MD\n- 3D Printing Surgical Planning for Reconstruction in Phramongkutklao Hospital\nNutthapong Wanichjaroen, MD\n- Computer Assisted Reconstructive Surgery Ramathibodi Experience\nKidakorn Kiranantawat, MD\nModerator: Kasama Nilprapha, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY2/+Watergate+Ballroom+B%26C/Day2+-+S9.mp4',
        },
        {
          topic: 'S11: Medicolegal Panel Discussion',
          description: '- Apirag Chuangsuwanich, MD\n- Sirachai Jindarak, MD\n- Anont Pitiseree, MD\n- Witoon Treesuntornrat, MD\nModerator: Charan Mahatumarat, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY2/+Watergate+Ballroom+B%26C/Day2+-+S11.mp4',
        },
      ],
    },
    {
      title: 'Friday, 29 OCTOBER 2021',
      titleColor: '#5A9CD6',
      lists: [
        {
          topic: 'Plenary Lecture3: Hi-Definition Ultrasonography and Advance Imaging for Supermicrosurgery',
          description: 'Akitatsu Hayashi, MD (Japan)\nModerator: Chalermpong Chatdokmaiprai, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY3/Day3+-+Plenary+Lecture3.mp4',
        },
        {
          topic: 'S13: Breast Reconstruction',
          description: '- Implant challenge: Biologic ADM vs Synthetic Mesh?\nVisnu Lohsiriwat, MD\n- Partial Breast Reconstruction\nVisnu Lohsiriwat, MD\n- Microsurgical Breast Reconstruction\nKidakorn Kiranantawat, MD\nModerator: Pornthep Sirimahachaiyakul, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY3/Watergate+Ballroom+B%26C/Day3+-+S13.mp4',
        },
        {
          topic: 'S14: High-definition Liposuction',
          description: '- High Def Liposuction\nParinya Yanpisitkul, MD\n- High Def Liposuction\nRonachai Komthong, MD\n- Body Tite Liposculpture\nSurinnart Charoenchitt, MD\n- Non-Invasive Body Contouring Modalities\nRungsima Wanitphakdeedecha, MD\nModerator: Seree Iamphongsai, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY3/Watergate+Ballroom+B%26C/Day3+-+S14.mp4',
        },
        {
          topic: 'Support Sym3: New Trend : Enhancing Surgery Care with New Post Surgical Silicone Dressing',
          description: 'Visnu Lohsiriwat, MD,  Warangkana Tonaree, MD. (Supported by Molnlycke)',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY3/Day+3+Support+Sym3+New+Trend.mp4',
        },
        {
          topic: 'S16: Difficult Blepharoplasty',
          description: 'Wimon Sirimaharaj, MD\nSorawuth Chu-Ongsakul, MD\nKamol Wattanakrai, MD\nModerator: Poonpissamai Suwajo, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY3/Watergate+Ballroom+B%26C/Day3+-+S16.mp4',
        },
        {
          topic: 'Closing + Farewell Break',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY3/Day3+-+Closing.mp4',
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
          description: '- The Evolution of Dorsal Augmentation with Super Fine Diced Cartilage\nSurawej Numhom, MD\n- Strategy for Septal Straightening\nMontien Lueprapai, MD\n- Open Rhinoplasty with Diced Cartilage, Pitfalls and Complications; My Experience\nSomboon Waiprib, MD\nModerator: Kidakorn Kiranantawat, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY1/Watergate+Ballroom+A/S4+Rhinoplasty.mp4',
        },
      ],
    },
    {
      title: 'Thursday, 28 OCTOBER 2021',
      titleColor: '#C45911',
      lists: [
        {
          topic: 'S6: Hand Surgery',
          description: '- Management of Apert Hands: KKU Approach\nKengkart Winaikosol, MD (15 min)\n- Neurovascular Island Flap for Fingertip Reconstruction\nWichit Siritattamrong, MD (15 min)\n -Webspace Reconstruction\nNatcha Ariyaprakai, MD\nModerator: Pasu Promniyom, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY2/Watergate+Ballroom+A/Day2+-S6.mp4',
        },
        {
          topic: 'S8: The Best Reconstructive Surgery Award',
          description: 'Best Creative Case:\nSurgical Management of a Patient with Severe and Complex Maxillofacial Injuries Caused by a Bear Mauling in the Forest; A Case Report from Thailand\nNutthawut Akaranuchat, MD\nBest Innovative Case:\nMirror LVA: Applying the of Low-cost Augmented Reality in Microsurgery\nNutcha Yodrabum, MD\nBest Practical Case:\nLiposuction + Skin Reduction in Upper Limb Lymphedema\nThanyanan Panich, MD\nBest Young Surgeon Case:\nWrist Amputation\nWorawat Kaewwichian, MD\nModerator: Palakorn Surakunprapha, MD ',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY2/Watergate+Ballroom+A/Day2+-+S8.mp4',
        },
        {
          topic: 'S10: Reconstructive Microsurgery and Lymphatic Surgery II',
          description: '- Reconstructive Surgery: Fast and Furious\nPalakorn Surakunprapha, MD\n-MSAPS\nApiruk Wongsoasup, MD\n- Heel Reconstruction\nPuttan Wongtriratanachai, MD\n- Microsurgical Techniques for the Different Situations of Lower Limb Reconstructions\nKengkart Winaikosol, MD\nModerator: Sitthichoke Taweepraditpol, MD ',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY2/Watergate+Ballroom+A/Day2+-+S10.mp4',
        },
        {
          topic: 'S12: Special Lecture',
          description: '- Personal Data Protection Act (PDPA)\nPassakorn Sawatdirak, MD\nModerator: Wimon Sirimaharaj, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY2/Watergate+Ballroom+A/Day2+-+S12.mp4',
        },
      ],
    },
    {
      title: 'Friday, 29 OCTOBER 2021',
      titleColor: '#5A9CD6',
      lists: [
        {
          topic: 'How I do It',
          description: '(10.00-10.10) Indocyanine-Green Fluorescence Angiography of the Transverse Cervical Arterial Supply to Clavicle Flaps: An Anatomical Study\nPapat Sriswadpong, MD\n(10.10-10.20) Microsurgery in a Regional Hospital: How to Survive\nKanda  Chetthasombat, MD\n(10.20-10.30) Unplanned Sarcoma; Decision Making and Management\nPhonlawat Trakunngoenthai, MD\n(10.30-10.40) Anterior Nasal Packing for Traumatic Epistaxis in Sawanpracharak Hospital\nAnurak Amornpetchsathaporn, MD\n(10.40-10.50)  Medical Reduction for Anterior Dislocation of TMJ\nAnurak Amornpetchsathaporn, MD\n(10.50-11.00) Surgery of Condylar Neck and Subcondyle Fracture\nChanchai Sajjaissariyawut, MD\nModerator: Palakorn Surakunprapha, MD ',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY3/Watergate+Ballroom+A/Day+3+How+I+do+It.mp4',
        },
        {
          topic: 'S17: Aesthetic Breast',
          description: '- Clinical Evidence of Breast Foreign Body and Fat Injection Complications\nVisnu Lohsiriwat, MD\n- From Unequal to Equal Breast Augmentation: How to Approach\nChatchai Pruksapong, MD\n- How to do Mastectomy when You Passed the 1000th Case\nChokchai Amornsawadwattana, MD\nModerator: Sukit Worathamrong, MD',
          video: 'https://thprsmeeting.s3.ap-southeast-1.amazonaws.com/Recordthprsmeeting/DAY3/Watergate+Ballroom+A/DAY+3+-+S17+Aesthetic+Breast.mp4',
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
                    {
                      list.video && (
                        <Button
                          type="primary"
                          onClick={() => {
                            setVideo(list.video)
                            setVisible(true)
                          }}
                        >
                          Watch
                        </Button>
                      )
                    }
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
