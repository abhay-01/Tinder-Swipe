import React, { useCallback } from 'react';
import { View, Text, Dimensions, Image, Animated } from 'react-native';
import TinderChoice from './TinderChoice';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function TinderCard({ item, firstCard, index,swipe, ...dragHandlers }) {

  const cardTranslateY = swipe.y.interpolate({
    inputRange: [-height, 0, height],
    outputRange: [-height / 2, 0, height / 2],
    extrapolate: 'clamp',
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [30, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-140, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const rotate = swipe.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const tinderSelection = useCallback(() => {
    return (
      <>
        <Animated.View
          style={{
            position: 'absolute',
            left: 10,
            top:10,
            opacity: likeOpacity,
          }}>
          <TinderChoice type={'✔'} />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            right: 10,
            top:10,
            opacity: nopeOpacity,
          }}>
          <TinderChoice type={'X'} />
        </Animated.View>
      </>
    );
  }, [likeOpacity, nopeOpacity]);

  return (
    <Animated.View
      style={[
        {
          width: width - 20,
          height: height - 150,
          alignSelf: 'center',
          position: 'absolute',
          borderRadius: 20,
          top: 70 + index * 10, 
          zIndex: -index, 
        },
        firstCard && { transform: [...swipe.getTranslateTransform(), { rotate: rotate }] },
      ]}
      {...dragHandlers}>
      <Image
        source={item.image}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 20,
        }}
      />
      {firstCard && tinderSelection()}
    </Animated.View>
  );
}
