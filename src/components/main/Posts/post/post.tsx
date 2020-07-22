import React from 'react'
import './post.scss'
import { Link } from 'react-router-dom'
// import '@fortawesome/fontawesome-free/css/all.min.css';
import postPhoto from '../../../../assets/images/postPhoto.jpg'
import CommentsSection from './commentsSection/commentsSection'
import { UserPhotoSection } from './userPhotoSection/userPhotoSection';

interface IProps{
  likes: [],
  owner: string,
  postComments: [],
  postID: string,
  postImg: string,
  posts: any,
  Post: any
}

const Post = (props: any) => {
  return(
  <div className="postWrapper">

    <div className="postOwnerInfo">
      {/* <img src="" alt=""/> */}
      {/* <div className="ownerIconOutline">
        <div className="ownerIcon">
        <i className="fas fa-user"></i>
        </div>
      </div> */}
      <UserPhotoSection />
      
      <div>
        <Link to="#">me</Link>
      </div>
    </div>

    <div className="ownerPhoto">
      <img src={postPhoto} alt="usersPhoto"/>
    </div>

    <div className="postButtons">
      <div className="likesButton">
        <i className="far fa-heart"></i>
      </div>
      <div className="likesCount">
        0 likes
      </div>
    </div>
    
    <div className="postText">
      <span>me </span>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
    </div>

    <CommentsSection />
    {/* <div className="addCommentSection">
      <textarea name="comment" />
    </div> */}
  </div>
  )
}

export default Post;