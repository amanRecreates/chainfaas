import React, { useEffect, useState } from 'react';
import './login.scss';
import firebase from '../../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function Login() {
    // const [state, setState] = useState({
    //     isLogin: false,
    // });
    const [login, setLogin] = useState(false);

    let submit_handler = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            // var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            console.log(user);
            // ...
        }).catch((error) => {
            console.log('error');
        });
    }


    //  for animation
    let signUpHandler = () => {
        const container = document.querySelector('.container')

        container.classList.add('sign-up-mode')
    }

    let signInHandler = () => {
        const container = document.querySelector('.container')

        container.classList.remove('sign-up-mode')
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("user signed in");
                console.log(user.displayName + '\n' + user.email);
                setLogin(true)
                // setState({
                //     isLogin: true,
                // })

            } else {
                console.log('user not signed in');
                // setState({
                //     isLogin: false,
                // })
                setLogin(false)
            }
        })
    }, []);


    return (
        <div className="Login">
            {(login === false) ? (
                <div>
                    <div class="container">
                        <div class="forms-container">
                            <div class="signin-signup">
                                <form action="#" class="sign-in-form">
                                    <h2 class="title">Sign in</h2>
                                    <div class="input-field">
                                        <i class="fas fa-user"></i>
                                        <input type="text" placeholder="Username" />
                                    </div>
                                    <div class="input-field">
                                        <i class="fas fa-lock"></i>
                                        <input type="password" placeholder="Password" />
                                    </div>
                                    <Link to="/provider" type="submit" value="Login" class="btn solid">Login</Link>
                                    <p class="social-text">Or Sign in with social platforms</p>
                                    <div class="social-media">
                                        <Link to="#" class="social-icon">
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </Link>
                                        <Link to="#" class="social-icon">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </Link>
                                        <Link to="#" class="social-icon" onClick={submit_handler}>
                                            <FontAwesomeIcon icon={faGoogle} />
                                        </Link>
                                        <Link to="#" class="social-icon">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                        </Link>
                                    </div>
                                </form>
                                <form class="sign-up-form" onClick={(e) => e.preventDefault()}>
                                    <h2 class="title">Sign up</h2>
                                    <div class="input-field">
                                        <i class="fas fa-user"></i>
                                        <input type="text" placeholder="Username" />
                                    </div>
                                    <div class="input-field">
                                        <i class="fas fa-envelope"></i>
                                        <input type="email" placeholder="Email" />
                                    </div>
                                    <div class="input-field">
                                        <i class="fas fa-lock"></i>
                                        <input type="password" placeholder="Password" />
                                    </div>
                                    <input type="submit" class="btn" value="Sign up" onClick={signInHandler} />
                                    <p class="social-text">Or Sign up with social platforms</p>
                                    <div class="social-media">
                                        <Link to="#" class="social-icon">
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </Link>
                                        <Link to="#" class="social-icon">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </Link>
                                        <Link to="#" class="social-icon" onClick={submit_handler}>
                                            <FontAwesomeIcon icon={faGoogle} />
                                        </Link>
                                        <Link to="#" class="social-icon">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="panels-container">
                            <div class="panel left-panel">
                                <div class="content">
                                    <h3>New here ?</h3>
                                    <p>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                        ex ratione. Aliquid!
                                    </p>
                                    <button class="btn transparent" id="sign-up-btn" onClick={signUpHandler}>
                                        Sign up
                                    </button>
                                </div>
                                <img src="img/log.svg" class="image" alt="" />
                            </div>
                            <div class="panel right-panel">
                                <div class="content">
                                    <h3>One of us ?</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                        laboriosam ad deleniti.
                                    </p>
                                    <button class="btn transparent" id="sign-in-btn" onClick={signInHandler}>
                                        Sign in
                                    </button>
                                </div>
                                <img src="img/register.svg" class="image" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

            ) :
                <div>
                    {window.location.replace("http://localhost:3000/provider")}

                </div>
            }
        </div>
    )
}

export default Login;

