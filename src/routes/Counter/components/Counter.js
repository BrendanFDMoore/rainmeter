import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable'

export const Counter = ({ counter, increment, doubleAsync }) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Counter: {counter}</h2>
    <button className='btn btn-primary' onClick={increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-secondary' onClick={doubleAsync}>
      Double (Async)
    </button>
    <View>
      <Text>Testing RNWeb?</Text>
      <Animatable.Text animation='zoomInUp'>Zoom me up, Scotty</Animatable.Text>
    </View>
  </div>
)
Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
}

export default Counter
