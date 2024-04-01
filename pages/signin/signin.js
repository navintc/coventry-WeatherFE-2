import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import {Button, Container, Form} from "react-bootstrap";


const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const signIn = async () => {
    try {
      router.push('/map');
    } catch (error) {
      console.log('error signing in', error);
    }
  };

  return (
    <Container
            className={"loginPage container text-center d-flex flex-column justify-content-center align-items-center"}>
            <text className={"login-title mt-2"}>Realtime Weather Monitoring Sytem</text>

            <Form className=" mt-md-4 mt-3 d-flex flex-column justify-content-center align-items-center"
                  onSubmit={(event) => onFormSubmit(props.authenticate, event)}>
                <Form.Group className={"login-form mt-md-4 mt-3 "} controlId="formBasicLoginEmail">
                    <Form.Control className={"form-control input-username text-center rounded-pill"} type="text"
                                  placeholder="Email or Username"
                                  onChange={ (e) => {
                                      setField('email', e.target.value)
                                  } }
                       
                    />
                    <Form.Control.Feedback type='invalid'>email error</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className=" mt-2" controlId="formBasicLoginPassword">
                    <Form.Control className={"input-password text-center rounded-pill"} type="password"
                                  placeholder="Password"
       
                    />
                    <Form.Control.Feedback type='invalid'>password error</Form.Control.Feedback>
                </Form.Group>
                <Button className={"login-button mt-4 rounded-pill"} id="loginButton" type="submit" >
                    
                    Log in
                </Button>
                <Form.Control.Feedback type='invalid'>login error</Form.Control.Feedback>
                <Button className={"sign-button mt-2 rounded-pill "} type="button" onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}>
                    <i className="fab fa-facebook" style={{color: "#696969"}}/>{" "}
                    Sign in with Facebook
                </Button>
            </Form>
            <p style={{fontFamily: "Aestetico-Regular", fontSize: "15px", color: "#707070"}}
               className={"mt-2 mt-md-4"}>Not a member yet? <a href={"/registration"} style={{color: "#707070"}}>Register</a> like, right now. <br/>
               Forgot Password? It's totally Fine. <a href={"/forgotpassword"} style={{color: "#707070"}}>Let's see what we can do.</a>
            </p>
            <p className={"mt-2 mt-md-4 mb-2"}
               style={{fontFamily: "Aestetico-Regular", fontSize: "15px", maxWidth: "400px", color: "#707070"}}>By
                clicking log in, you agree to our service's <a href={""}>Terms of Service</a> and
                acknowledge that Mindfrend’s <a href={""}>Privacy Policy</a> applies to you.
            </p>
        </Container>


    // <div>
    //   <input
    //     name="username"
    //     onChange={(e) => setUsername(e.target.value)}
    //   />
    //   <input
    //     name="password"
    //     type="password"
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button onClick={signIn}>Sign In</button>
    // </div>
  );
};

export default SignIn;
