import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { GoogleLogin } from 'react-google-login'

import config from '../../config'
import { signIn } from '../../actions/auth'
import { history } from '../../router/historyRouter'
import './style.css'

class Login extends React.Component {
  constructor() {
      super();
      this.state = { };
  }
  componentDidMount() {
    const token = localStorage.getItem('token')
    if(token != null && token.length > 0) {
      history.push('/tasks')
    }
  }
  logout = () => {
      this.setState({isAuthenticated: false, token: '', user: null})
  };

  googleResponse = (response) => {
      // console.log('accessToken:', response.accessToken)
      axios.post('http://localhost:5000/auth/google',
                {access_token: response.accessToken})
          .then(response => {
            this.props.signIn(response.data)
          })
          .catch(result => {
            console.log(result)
          })
  }
  onFailure = (error) => {
    alert(error);
  }
  render() {
    let content = !!this.state.isAuthenticated ?
    (
        <div>
            <p>Authenticated</p>
            <div>
                {this.state.user.email}
            </div>
            <div>
                <button onClick={this.logout} className="button">
                    Log out
                </button>
            </div>
        </div>
    ) :
    (
        <div>
            <GoogleLogin
                clientId={config.google.clientID}
                buttonText="Sign in with Google"
                onSuccess={this.googleResponse}
                onFailure={this.googleResponse}
            />
        </div>
    );
    return(
      <div className="LoginWrapper">
        <h1> Create your free account </h1>
        <p> Start using in less than a minute </p>
        {content}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos
})
const mapDispatchToProps = (dispatch) => ({
  signIn: (token) => dispatch(signIn(token))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
