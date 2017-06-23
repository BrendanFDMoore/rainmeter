import React from 'react'
import PropTypes from 'prop-types'
// import { Text, View, Image, Dimensions } from 'react-native'
import { StyleSheet, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'

const MONEY_DIMENSIONS = { width: 100, height: 44 }
const SCREEN_DIMENSIONS = Dimensions.get('window')
// const SCREEN_DIMENSIONS = { width: 1900, height: 1200 }
console.log('SCREEN_DIMENSIONS')
console.log(SCREEN_DIMENSIONS)

const randomize = max => Math.random() * max
const range = (count) => {
  const arr = []
  for (let i = 0; i < count; i++) {
    arr.push(i)
  }
  return arr
}

const Falling = ({ duration, delay, style, children }) => (
  <Animatable.View
    animation={{
      from: { translateY: -MONEY_DIMENSIONS.height },
      to: { translateY: SCREEN_DIMENSIONS.height + 5 * MONEY_DIMENSIONS.height },
    }}
    duration={duration}
    delay={delay}
    easing={t => Math.pow(t, 1.7)}
    iterationCount={1}
    useNativeDriver
    style={style}
  >
    {children}
  </Animatable.View>
)

const Swinging = ({ amplitude, rotation = 7, ...props }) => (
  <Animatable.View
    animation={{
      0: {
        translateX: -amplitude,
        translateY: 0,
        rotate: `${rotation}deg`,
      },
      0.5: {
        translateX: 0,
        translateY: amplitude / 2,
        rotate: '0deg',
      },
      1: {
        translateX: amplitude,
        translateY: 0,
        rotate: `${-rotation}deg`,
      },
    }}
    direction='alternate'
    easing='ease-in-out'
    iterationCount='infinite'
    useNativeDriver
    {...props}
  />
)

const styles = StyleSheet.create({
  money: {
    width: 100,
    height: 44
  }
})

const FLIP_KEYFRAMES = {
  from: { rotateX: '0deg' },
  to: { rotateX: '360deg' },
}

const FLIP_BACK_KEYFRAMES = {
  from: { rotateX: '180deg' },
  to: { rotateX: '-180deg' },
}

const FlippingImage = ({ delay, duration = 2000, source, back }) => (
  <Animatable.Image
    animation={back ? FLIP_BACK_KEYFRAMES : FLIP_KEYFRAMES}
    duration={duration}
    delay={delay}
    easing='linear'
    iterationCount='infinite'
    useNativeDriver
    style={[styles.money,
      {
        position:'absolute',
        backfaceVisibility: 'hidden',
      }
    ]}
    source={source}
  />
)

const MakeItRain = ({ count = 10, duration = 2000 }) => (
  <div style={{ top: '-100px', position: 'fixed' }}>
    {range(count).map(i => randomize(1000)).map((flipDelay, i) => (
      <Falling
        key={i}
        duration={2000}
        delay={i * ((duration - 2000) / count)}
        style={{
          position: 'absolute',
          left: randomize(SCREEN_DIMENSIONS.width - MONEY_DIMENSIONS.width),
        }}
      >
        <Swinging amplitude={MONEY_DIMENSIONS.width / 5} delay={randomize(duration)}>
          <FlippingImage source={require('fiver-front-sm.png')} delay={flipDelay} />
          <FlippingImage source={require('fiver-back-sm.png')} delay={flipDelay} back />
        </Swinging>
      </Falling>
    ))}
  </div>
)

const GOAL = 500

export const Counter = ({ counter, showRain, increment, reset }) => {
  const PCT = counter * 100.0 / GOAL
  return (
    <div style={{ margin: '0 auto', overflow: 'hidden' }} >
      { (showRain) && <MakeItRain count={25} duration={5000} />}
      <h2>Goal: ${GOAL}</h2>
      <h2>Raised: ${counter}</h2>
      <div style={{ margin: '20px auto', width: '80%', height: '50px', backgroundColor:'gray' }}>
        <div style={{ left: '0', top: '0', width: `${PCT}%`, height: '50px', backgroundColor:'green' }} />
      </div>
      <button className='btn btn-primary' onClick={increment} disabled={showRain}>
        MAKE IT RAIN
      </button>
      {' '}
      <button className='btn btn-secondary' onClick={reset}>
        Reset
      </button>
    </div>
  )
}
Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  showRain: PropTypes.bool,
  increment: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

export default Counter
