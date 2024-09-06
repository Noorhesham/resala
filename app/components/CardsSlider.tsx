"use client";
import React, { useEffect, useRef } from "react";
import type SwiperType from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Paragraph from "./defaults/Paragraph";
import { StarIcon } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";

const SliderCards = ({ cards }) => {
  const container = useRef<any>();
  const [swiper, setSwiper] = React.useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className=" flex flex-col h-full parallax-end  relative z-40">
      <Swiper
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
        ref={container}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={20}
        slidesPerView={4}
        className="h-full w-full flex flex-col  z-40 relative"
      >
        {cards?.map((d, i) => (
          <SwiperSlide className="group w-full  mt-10 text-4xl" key={i}>
            <div className="flex flex-col items-center relative z-40 w-72 max-w-xl ">
              <div className=" rounded-full overflow-hidden w-20 aspect-square h-20 relative">
                <Image src={d.photo.secure_url} fill alt="course image" />
              </div>
              <div className="flex flex-col items-center">
                <Paragraph description={d.description} />
                <h2 className="text-xl font-semibold  blue_gradient">{d.name}</h2>
                <div className=" flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarFilledIcon className=" text-primary h-3 w-3" />
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderCards;
