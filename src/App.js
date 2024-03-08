import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const classList = ['blue', 'orange', 'yellow', 'red', 'green']

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    latestList: [],
    isShow: false,
    isTrue: false,
  }

  addContent = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const classAdd = classList[Math.floor(Math.random() * 5)]
    const initial = website.slice(0, 1).toUpperCase()
    const NewContent = {
      id: v4(),
      initialName: initial,
      websiteName: website,
      userName: username,
      passWord: password,
      classValue: classAdd,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, NewContent],
      website: '',
      username: '',
      password: '',
      searchInput: '',
      isTrue: true,
    }))
  }

  onChangeInputPassword = e => {
    this.setState({password: e.target.value})
  }

  onChangeInputUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangeInputWeb = e => {
    this.setState({website: e.target.value})
  }

  OnShowPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onSearchInput = e => {
    this.setState({searchInput: e.target.value})
  }

  deleteValue = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachItem => eachItem.id !== id)
    const caseOf = newList.length !== 0
    this.setState({isTrue: caseOf, latestList: newList})
  }

  render() {
    const {
      website,
      username,
      password,
      latestList,
      searchInput,
      isShow,
    } = this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    console.log(newList)

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-lobo"
        />
        <div className="main-container">
          <form className="form" onSubmit={this.addContent}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="form-img"
              />
              <input
                type="text"
                className="form-input"
                placeholder="Enter Website"
                onChange={this.onChangeInputWeb}
                value={website}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="form-img"
              />
              <input
                type="text"
                className="form-input"
                placeholder="Enter Username"
                onChange={this.onChangeInputUsername}
                value={username}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="form-img"
              />
              <input
                type="password"
                className="form-input"
                placeholder="Enter Password"
                onChange={this.onChangeInputPassword}
                value={password}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
            alt="password manager"
            className="password-manager"
          />
        </div>
        <div className="show-main-container">
          <div className="show-details-container">
            <div className="your-password">
              <h1 className="your-password-heading">Your Passwords</h1>
              <p className="your-password-length">{latestList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
              <hr />
              <input
                type="search"
                className="search-input"
                placeholder="search"
                onChange={this.onSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-password">
            <input
              type="checkbox"
              className="check-box"
              id="checkbox"
              onClick={this.OnShowPassword}
            />
            <label htmlFor="checkbox" className="label-password">
              Show passwords
            </label>
          </div>
          {!isTrue && (
            <div className="no-password">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-img"
              />
              <p className="your-password-heading">no passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="ul-list">
              {newList.map(eachDetail => (
                <li key={eachDetail.id} id={eachDetail.id} className="list">
                  <div className="show-details">
                    <div className="test">
                      <div className={`initial ${eachDetail.classValue}`}>
                        <p>{eachDetail.initialName}</p>
                      </div>
                      <div className="items">
                        <p className="show-heading">{eachDetail.websiteName}</p>
                        <p className="show-heading">{eachDetail.userName}</p>
                        {!isShow && (
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                            alt="stars"
                            className="stars"
                          />
                        )}
                        {isShow && (
                          <p className="show-heading">{eachDetail.passWord}</p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => this.deleteValue(eachDetail.id)}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="delete"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
