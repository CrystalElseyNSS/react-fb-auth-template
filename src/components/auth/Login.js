import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Card,CardBody } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import './Auth.css';

export default function Login() {
  const history = useHistory();
  const { login } = useContext(UserProfileContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault()
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"))
      ;
  };

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
          <h3 className="authTitle">Account Sign In</h3>
          <Form onSubmit={loginSubmit}>
              <fieldset>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    onChange={(e) => {
                      e.preventDefault()
                      setEmail(e.target.value)
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="authBtnContainer">
                  <Button className="authBtn">Login</Button>
                </FormGroup>
                <div className="authSwitchContainer">
                  <em className="authSwitchLink">
                    Not registered? <Link to="register">Register</Link>
                  </em>
                </div>
              </fieldset>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
