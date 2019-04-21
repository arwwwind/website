import React from 'react'
import Zoom from 'react-reveal/Zoom'

const Post = props => {
  return (
    <Zoom bottom>
      <div className='post'>
        <a
          href={props.data.url}
          target='_blank'
          className={'bg ' + props.data.class}
        >
          <div
            className='image'
            style={{ backgroundImage: `url(${props.data.image})` }}
          />
        </a>
        <div className='p-title'>{props.data.title}</div>
        <div className='p-desc'>{props.data.desc}</div>
      </div>
    </Zoom>
  )
}

export default Post
