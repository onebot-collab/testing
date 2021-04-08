import React, { Component } from 'react'
import MultiStep from 'react-multistep'

import UserAddStepOne from './UserAddStepOne'
import UserAddStepTwo from './UserAddStepTwo'
import UserAddStepThree from './UserAddStepThree'

export default class UserAdd extends Component {
  render() {
    const steps = [
      { component: <UserAddStepOne /> },
      { component: <UserAddStepTwo /> },
      { component: <UserAddStepThree /> },
    ]
    const prevStyle = { background: '#b71c1c', width: '200px' }
    const nextStyle = { background: '#b71c1c', width: '200px' }
    return (
      <div>
        <MultiStep steps={steps} prevStyle={prevStyle} nextStyle={nextStyle} />
      </div>
    )
  }
}
