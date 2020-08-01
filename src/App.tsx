import React from 'react';
import s from'./App.module.scss';
import { Route } from 'react-router-dom';
import SignInForm from './components/auth/signIn/signIn';
import SignUpForm from './components/auth/signUp/signUp'
import mainContainer from './components/main/mainContainer';
import * as firebase from "firebase";
import { logInUser } from './redux/auth/action'
import { connect } from 'react-redux';
import { setPost, resetInitialLoad, setNewPost, turnOnNewPostNotification } from './redux/posts/actions';
import ProfileContainer from './components/profile/profileContainer'

interface IProps{
  logInUser: any,
  setPost?: any,
  initialeLoad: boolean,
  resetInitialLoad: any,
  setNewPost: any,
  turnOnNewPostNotification: any
}

class App extends React.Component<IProps> {
    componentDidMount() {
      firebase.auth().onIdTokenChanged(
          (user) => {
            if (user !== null) {
              this.props.logInUser(user.displayName, user.uid, user.photoURL);
            }
            if (user && user.displayName === null) {
              firebase.auth().updateCurrentUser(user);
            }
          }
      );
    // addPostAPI.getAllPosts()

      // firebase.firestore().collection("usersPosts")
      // .orderBy("uploadTime", "asc").onSnapshot((snapshot) => {
      //   this.props.resetPosts()
      //   //console.log("Listener for all" + " " + this.props.posts.length)
      //   //debugger
      //     snapshot.forEach(
      //       (doc: any) => this.props.setPost(doc.id, doc.data())
      //       )
      // })

      firebase.firestore().collection("usersPosts")
      .orderBy("uploadTime", "asc").onSnapshot((snapshot) => {
        if(this.props.initialeLoad){
          snapshot.docs.map((doc) => {
            this.props.setPost(doc.id, doc.data())
          })
         this.props.resetInitialLoad()
        } else {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                 console.log("Added", change.doc.data());
                 this.props.setNewPost(change.doc.id, change.doc.data())
                 this.props.turnOnNewPostNotification()
            }
            if (change.type === "modified") {
                console.log("Modified: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed: ", change.doc.data());
            }
        });
        }
    });
    
  }

  render() {
    return (
      <div className={s.mainWrapper}>
        <Route exact path="/" component={SignInForm}/>
        <Route path="/signUp" component={SignUpForm}/>
        <Route path="/main" component={mainContainer}/>
        <Route path="/profile" component={ProfileContainer}/>
      </div>
    );
  }
 
}

const mapStateToProps = (state: any) => {
  return{
    isAuth: state.auth.isAuth,
    initialeLoad: state.postsPage.initialeLoad
  }
}


export default connect(mapStateToProps, {logInUser, setPost, resetInitialLoad, setNewPost, turnOnNewPostNotification})(App);
