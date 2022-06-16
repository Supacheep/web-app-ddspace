import {
  useContext,
  useState,
} from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from '../styles/Home.module.css'
import userContext from '../src/context/userContext'
import {
  ModalLogin, MobileLayout, ModalLoading,
} from '../src/components'
import useCalculateSize from '../src/libs/useCalculateSize'
import { FullImageWrapper } from '../src/components/common'
import { colors } from '../src/configs/color'

const Index = () => (
  <div className={styles.container}>
    index
  </div>
)

export default Index
