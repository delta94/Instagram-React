import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import HeaderConatiner from '../header/headerContainer'
import './mainContainer.scss'
// import AddPostButton from './addPostButton/addPostButton'
import PostsContainer from './Posts/postsConatainer'
import ModalWindowContainer from './Posts/post/modalWindow/modalWindowContainer'

interface IProps {
  logout: any,
  state: any,
  isAuth: boolean,
}

class MainContainer extends React.Component<IProps>{
  render() {
    if (!this.props.isAuth) {
      return <Redirect to={"/"} />
    } 
    return(
    <>
      <HeaderConatiner />
      <div className="wrapperToMain">
        {/* <AddPostButton /> */}
        <ModalWindowContainer />
        <PostsContainer />
        {/* <Main logout={this.props.logout}/> */}
      {/* {this.props.isAuth ? <Main logout={this.props.logout}/> : <Redirect to={"/"} />} */}
      </div>
    </>
    )
  }
}

const MapStateToProps = (state: any) => {
  return{
    isAuth: state.auth.isAuth,
  }
}

export default connect (MapStateToProps, {}) (MainContainer)