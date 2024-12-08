import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Canvas  from 'react-native-canvas';
import Slider from '@react-native-community/slider';

const width = Dimensions.get('window').width - 60;
const height = Dimensions.get('window').height - 300;

interface State {
  mass: number;
  gravity: number;
  force: number;
  angle: number;
  acceleration: { x: number; y: number };
  velocity: { x: number; y: number };
  position: { x: number; y: number };
  isForceApplied: boolean;
  friction: number;
  elasticity: number;
  timeStep: number;
  forceAppliedTime: number;
  maxForceTime: number;
  forceMagnitudeFactor: number;
}

const initialState: State = {
  mass: 5,
  gravity: 9.8,
  force: 20,
  angle: 0,
  acceleration: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  position: { x: width / 2, y: height - 140 },
  isForceApplied: false,
  friction: 1,
  elasticity: 0.8,
  timeStep: 1/60,
  forceAppliedTime: 0,
  maxForceTime: 0.1,
  forceMagnitudeFactor: 0.5
};

export default function PhysicsSimulation() {
  const [state, setState] = useState<State>(initialState);
  const canvasRef = useRef<Canvas>(null);
  const animationRef = useRef<number>(0);
  const positionX = useSharedValue(initialState.position.x);
  const positionY = useSharedValue(initialState.position.y);

  useEffect(() => {
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const resetPosition = () => {
    setState(prevState => ({
      ...prevState,
      position: { x: width / 2, y: height - 140 },
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      isForceApplied: false
    }));
    positionX.value = width / 2;
    positionY.value = height - 140;
  };

  const applyForce = () => {
    setState(prevState => {
      const angleRad = (prevState.angle - 90) * (Math.PI / 180);
      const scaledForce = (prevState.force * prevState.forceMagnitudeFactor) / prevState.mass;
      const newVelocityX = prevState.velocity.x + Math.cos(angleRad) * scaledForce;
      const newVelocityY = prevState.velocity.y + Math.sin(angleRad) * scaledForce;
      
      return {
        ...prevState,
        isForceApplied: true,
        forceAppliedTime: 0,
        velocity: { x: newVelocityX, y: newVelocityY }
      };
    });
  };

  const updatePhysics = () => {
    setState(prevState => {
      if (!prevState.isForceApplied) return prevState;

      let scaledGravity = prevState.gravity * 0.1;
      let newVelocityX = prevState.velocity.x * prevState.friction;
      let newVelocityY = (prevState.velocity.y + scaledGravity * prevState.timeStep) * prevState.friction;
      let newPositionX = prevState.position.x + newVelocityX;
      let newPositionY = prevState.position.y + newVelocityY;

      // Boundary collisions
      const radius = 30;
      if (newPositionY + radius > height - 100) {
        newPositionY = height - 100 - radius;
        newVelocityY = -newVelocityY * prevState.elasticity;
      }
      if (newPositionY - radius < 0) {
        newPositionY = radius;
        newVelocityY = -newVelocityY * prevState.elasticity;
      }
      if (newPositionX + radius > width) {
        newPositionX = width - radius;
        newVelocityX = -newVelocityX * prevState.elasticity;
      }
      if (newPositionX - radius < 0) {
        newPositionX = radius;
        newVelocityX = -newVelocityX * prevState.elasticity;
      }

      positionX.value = newPositionX;
      positionY.value = newPositionY;

      return {
        ...prevState,
        position: { x: newPositionX, y: newPositionY },
        velocity: { x: newVelocityX, y: newVelocityY }
      };
    });
  };

  const animate = () => {
    updatePhysics();
    drawObject();
    animationRef.current = requestAnimationFrame(animate);
  };

  const drawObject = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height - 100);
    
    ctx.beginPath();
    ctx.arc(state.position.x, state.position.y, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#3498db';
    ctx.fill();
    ctx.strokeStyle = '#2980b9';
    ctx.lineWidth = 2;
    ctx.stroke();

    if (state.isForceApplied && state.forceAppliedTime < state.maxForceTime) {
      const angleRad = (state.angle - 90) * (Math.PI / 180);
      const arrowLength = 50;
      const arrowWidth = 10;
      const endX = state.position.x + Math.cos(angleRad) * arrowLength;
      const endY = state.position.y + Math.sin(angleRad) * arrowLength;

      ctx.beginPath();
      ctx.moveTo(state.position.x, state.position.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.stroke();

      const headAngle1 = angleRad + Math.PI / 6;
      const headAngle2 = angleRad - Math.PI / 6;
      const headX1 = endX - Math.cos(headAngle1) * arrowWidth;
      const headY1 = endY - Math.sin(headAngle1) * arrowWidth;
      const headX2 = endX - Math.cos(headAngle2) * arrowWidth;
      const headY2 = endY - Math.sin(headAngle2) * arrowWidth;

      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(headX1, headY1);
      ctx.lineTo(headX2, headY2);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.fill();
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(positionX.value - 30) },
        { translateY: withSpring(positionY.value - 30) },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Canvas ref={canvasRef} style={styles.canvas} />
      <Animated.View style={[styles.object, animatedStyle]} />
      <View style={styles.controls}>
        <Text>Mass: {state.mass} kg</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          value={state.mass}
          onValueChange={(value) => setState(prevState => ({ ...prevState, mass: value }))}
        />
        <Text>Gravity: {state.gravity.toFixed(1)} m/s²</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={20}
          value={state.gravity / 9.8}
          onValueChange={(value) => setState(prevState => ({ ...prevState, gravity: value * 9.8 }))}
        />
        <Text>Force: {state.force} N</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={state.force}
          onValueChange={(value) => setState(prevState => ({ ...prevState, force: value }))}
        />
        <Text>Angle: {Math.round(state.angle)}°</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={360}
          value={state.angle}
          onValueChange={(value) => setState(prevState => ({ ...prevState, angle: value }))}
        />
        <TouchableOpacity style={styles.button} onPress={applyForce}>
          <Text style={styles.buttonText}>Apply Force</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetPosition}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  canvas: {
    width: width,
    height: height - 100,
  },
  object: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3498db',
    borderWidth: 2,
    borderColor: '#2980b9',
  },
  controls: {
    padding: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

