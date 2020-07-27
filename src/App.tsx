import React from 'react';
import s from'./App.module.scss';
import { Route } from 'react-router-dom';
import SignInForm from './components/auth/signIn/signIn';
import SignUpForm from './components/auth/signUp/signUp'
import mainContainer from './components/main/mainContainer';
import * as firebase from "firebase";
import { logInUser } from './redux/authReducer'
import { connect } from 'react-redux';
import { setPost, resetPosts } from './redux/posts/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps{
  logInUser: any,
  setPost?: any,
  resetPosts: any,
  posts: any[]
}

class App extends React.Component<IProps> {
    componentDidMount() {
      firebase.auth().onIdTokenChanged(
          (user) => {
            if (user !== null) {
                        // console.log(user.uid)
                        this.props.logInUser(user.displayName, user.uid);
            }
            if (user && user.displayName === null) {
              firebase.auth().updateCurrentUser(user);
            }
          }
      );
    // addPostAPI.getAllPosts()

      firebase.firestore().collection("usersPosts")
      .orderBy("uploadTime", "asc").onSnapshot((snapshot) => {
        this.props.resetPosts()
        //console.log("Listener for all" + " " + this.props.posts.length)
        //debugger
        if(this.props.posts.length < 1){
          snapshot.forEach(
            (doc: any) => this.props.setPost(doc.id, doc.data())
            )
        }
        
      })

   

    //   firebase.firestore().collection("usersPosts")
    //   .orderBy("uploadTime", "asc").onSnapshot((snapshot) => {
    //     snapshot.docChanges().forEach((change) => {
    //         if (change.type === "added") {
    //              //console.log("Added", change.doc.data());
    //              toast.dark("Added new post!" )
    //              this.props.setPost(change.doc.id, change.doc.data())
    //         }
    //         if (change.type === "modified") {
    //             console.log("Modified: ", change.doc.data());
    //         }
    //         if (change.type === "removed") {
    //             console.log("Removed: ", change.doc.data());
    //         }
    //     });
    // });
    

  }

  render() {
    return (
      <div className={s.mainWrapper}>
        <Route exact path="/" component={SignInForm}/>
        <Route path="/signUp" component={SignUpForm}/>
        <Route path="/main" component={mainContainer}/>
      </div>
    );
  }
 
}

const mapStateToProps = (state: any) => {
  return{
    isAuth: state.auth.isAuth,
    posts: state.postsPage.posts
  }
}


export default connect(mapStateToProps, {logInUser, setPost, resetPosts})(App);
