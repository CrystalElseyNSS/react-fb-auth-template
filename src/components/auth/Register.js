import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Input, Card, CardBody } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import "./Auth.css";

export default function Register() {
  const history = useHistory();
  const { register } = useContext(UserProfileContext);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match.");
    } else {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
      };
      register(user, password).then(() => history.push("/"));
    }
  };

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <h3 className="authTitle">Create an Account</h3>
            <Form onSubmit={registerClick}>
              <fieldset>
                <FormGroup>
                  <Input
                    id="firstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="First Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    id="lastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder="Last Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    id="email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email Address"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Choose a Password"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    id="confirmPassword"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm Password"
                  />
                </FormGroup>

                <FormGroup className="authBtnContainer">
                  <Button className="authBtn">Register</Button>
                </FormGroup>
                <div className="authSwitchContainer">
                  <em className="authSwitchLink">
                    Already registered? <Link to="login">Login</Link>
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
