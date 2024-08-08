import React from 'react'
import { BorderBeam } from './CustomDesignes/BorderBeam'
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import photos from './photos';
import BlurFade from "./CustomDesignes/BlurFade";

const Options = () => {
  return (
    <div className='bg-black  h-screen w-full p-4'>
      <div className='p-8 h-auto relative rounded-lg bg-white/10 backdrop-blur-md'>
      <BorderBeam />
      <BlurFade delay={0.25} inView> 
      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={150}
        rowConstraints={{ singleRowMaxHeight: 250 }}
      />
      </BlurFade>
      </div>
    </div>
  )
}

export default Options
