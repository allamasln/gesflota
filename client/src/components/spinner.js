import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div className="preloader"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      {(this.props.text != "") && <p>{this.props.text}</p>}
      </div>
    )
  }
}
