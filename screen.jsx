import React, { useState, useRef, useCallback, useEffect } from 'react'
import { View, Text, Image, Animated, PanResponder, Dimensions } from 'react-native'
import TinderCard from './components/TinderCard';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Screen() {

    const [data, setData] = useState([
        {
            image: require('./assets/images/sky.jpg'), id: 1, title: 'sky'
        },
        {
            image: require('./assets/images/brown.jpeg'), id: 2, title: 'Brown'
        },
        {
            image: require('./assets/images/pink.jpg'), id: 3, title: 'pink'
        },

        {
            image: require('./assets/images/green.jpg'), id: 4, title: 'Green'
        },

    ]);

    useEffect(() => {
        if (data.length === 0) {
            setData([
                {
                    image: require('./assets/images/sky.jpg'), id: 1, title: 'sky'
                },
                {
                    image: require('./assets/images/brown.jpeg'), id: 2, title: 'Brown'
                },
                {
                    image: require('./assets/images/pink.jpg'), id: 3, title: 'pink'
                },

                {
                    image: require('./assets/images/green.jpg'), id: 4, title: 'Green'
                },
            ])
        }
    }, [data]);

    const swipe = useRef(new Animated.ValueXY()).current;
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy }) => {
            swipe.setValue({ x: dx, y: dy });
        },
        onPanResponderRelease: (_, { dx, dy }) => {
            console.log("released:", dx, dy);
            let direction = Math.sign(dx);
            let isAction = Math.abs(dx) > 100;

            if (isAction) {
                Animated.timing(swipe, {
                    toValue: { x: 400 * dx, y: dy },
                    useNativeDriver: true,
                    duration: 200,
                }).start(removeCard);
            } else {
                Animated.spring(swipe, {
                    toValue: { x: 0, y: 0 },
                    duration: 200,
                    useNativeDriver: true,
                    friction: 5
                }).start();
            }
        }
    })

    const removeCard = useCallback(() => {
        setData((prev) => prev.slice(1));
        swipe.setValue({ x: 0, y: 0 });
    }, [swipe]);

    return (
        <View style={{
            flex: 1,
        }}>
            {
                data.map((item, index) => {
                    let firstCard = index === 0;
                    let dragHandlers = firstCard ? panResponder.panHandlers : {};
                    return (
                        <TinderCard item={item} firstCard={firstCard} swipe={swipe} {...dragHandlers} index />
                    )
                }).reverse()
            }
        </View>
    )
}
