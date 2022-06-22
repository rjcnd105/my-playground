import { Box, Flex } from '@chakra-ui/react'
import type { LinksFunction } from '@remix-run/server-runtime'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { A11y, Pagination } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'

import Button from '~/components/ui/Button'

import Intro from './Intro'
import Step1 from './Step1'
import Step2 from './Step2'
import css from './tutorial.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: css }]
type Props = {
  onSkip: () => void
  onCompleted: () => void
}

const Tutorial = ({ onSkip, onCompleted }: Props) => {
  const swiper = useRef<SwiperClass | null>(null)
  const [swiperIndex, setSwiperIndex] = useState(0)

  return (
    <div className="article_tutorial-wrap">
      <div className="tutorial-swiper-contents">
        <Swiper
          className={`tutorial-swiper swiper-active-slide-${swiperIndex}`}
          modules={[Pagination, A11y]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          threshold={5}
          grabCursor={true}
          onSlideChange={({ activeIndex }) => {
            setSwiperIndex(activeIndex)
          }}
          onSwiper={(swiperIns) => {
            swiper.current = swiperIns
          }}
        >
          <SwiperSlide className="article_tutorial-screen">
            <Intro />
          </SwiperSlide>
          <SwiperSlide className="article_tutorial-screen">
            <Step1></Step1>
          </SwiperSlide>
          <SwiperSlide className="article_tutorial-screen">
            <Step2></Step2>
          </SwiperSlide>

          <Box className="swiper-navigation-wrapper" slot="container-end">
            <Box className="swiper-navigation">
              <Button onClick={onSkip}>skip</Button>
              <Button onClick={() => swiper.current?.slideNext()}>다음</Button>
            </Box>
            <Box className="swiper-cta">
              <Button
                theme="blue"
                fontSize="h2"
                fontWeight="b"
                w="100%"
                padding="16"
                hasBorder
                borderColor="black !important"
                onClick={onCompleted}
              >
                바로 시작하기
              </Button>
            </Box>
          </Box>
        </Swiper>
      </div>
    </div>
  )
}

export default Tutorial
