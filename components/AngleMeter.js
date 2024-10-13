// AngleMeter.js
import { View, PanResponder, Animated, StyleSheet, Text, Dimensions } from 'react-native';
import { useAngle } from '../store/angleCtx';
import { AngleProvider } from '../store/angleCtx';
import { useState } from 'react';

const responsive = Dimensions.get('window').width

const AngleMeter = ({ style }) => {
    const { setAngle } = useAngle();
    const [dots, setDots] = useState([
        { x: 50, y: 250 },
        { x: 150, y: 250 },
        { x: 250, y: 250 },
    ]);

    const panResponders = dots.map((dot, index) =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                const updatedDots = [...dots];
                updatedDots[index] = {
                    x: dot.x + gestureState.dx,
                    y: dot.y + gestureState.dy,
                };
                setDots(updatedDots);
            },
        })
    );

    const angleStyle = {
        position: 'absolute',
        top: responsive * 0.2,
        left: 8,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
        width : responsive * 0.24
    };

    const connectDotsStyle = (dot1, dot2) => {
        const centerX = (dot1.x + dot2.x) / 2;
        const centerY = (dot1.y + dot2.y) / 2;
        const width = Math.sqrt((dot2.x - dot1.x) ** 2 + (dot2.y - dot1.y) ** 2);
        const height = 2;
        const angle = Math.atan2(dot2.y - dot1.y, dot2.x - dot1.x) * (180 / Math.PI);

        return {
            top: centerY,
            left: centerX - width / 2 + 15,
            width,
            height,
            transform: [{ rotate: angle + 'deg' }],
            backgroundColor: '#ff0049',
        };
    };

    const calculateAngle = (point1, point2, point3) => {
        const rad1 = Math.atan2(point3.y - point2.y, point3.x - point2.x);
        const rad2 = Math.atan2(point1.y - point2.y, point1.x - point2.x);
        let angleRad = rad1 - rad2;
        let angleDeg = angleRad * (180 / Math.PI);
        angleDeg = angleDeg < 0 ? 360 + angleDeg : angleDeg;
        setAngle(angleDeg)
        return angleDeg;
    };

    return (
        <AngleProvider>
        <View style={[style, { flex: 1, justifyContent: 'center' }]}>
            {dots.map((dot, index) => {
                const nextDot = dots[index + 1];

                return index === 2 ? null : <View key={`${index}-${(index + 1) % dots.length}`} style={[connectDotsStyle(dot, nextDot), { marginTop: -2, zIndex: 2 }]} />;
            })}
            {dots.map((dot, index) => {
                return index === 1 ? (
                    <Animated.View
                        key={index}
                        {...panResponders[index].panHandlers}
                        style={[styles.dot, { transform: [{ translateX: dot.x - 22 }, { translateY: dot.y }], width: 75, height: 75, backgroundColor: 'transparent', borderWidth: 2, borderRadius: 100, borderColor: 'yellow' }]}
                    >
                        <View style={[styles.dot, { backgroundColor: 'transparent', width: 100, height: 100, borderRadius: 100 }]}></View>
                    </Animated.View>
                ) : (
                    <Animated.View
                        key={index}
                        {...panResponders[index].panHandlers}
                        style={[styles.dot, { transform: [{ translateX: dot.x }, { translateY: dot.y }], backgroundColor: '#96b6c5' }]}
                    >
                        <View style={[styles.dot, { backgroundColor: 'transparent', width: 40, height: 40, borderRadius: 30 }]}></View>
                    </Animated.View>
                );
            })}
            <View style={angleStyle}>
                <Text style={{ fontSize: responsive*0.04 }}>
                    {calculateAngle(dots[0], dots[1], dots[2]).toFixed(2)} °
                </Text>
            </View>
        </View>
        </AngleProvider>
    );
};

const styles = StyleSheet.create({
    dot: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
});

export default AngleMeter;
