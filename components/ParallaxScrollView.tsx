import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

const HEADER_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 60;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollOffset.value,
        [0, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
        [HEADER_HEIGHT, HEADER_MIN_HEIGHT],
        'clamp'
      ),
      opacity: interpolate(
        scrollOffset.value,
        [0, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
        [1, 0.3],
        'clamp'
      ),
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, -(HEADER_HEIGHT - HEADER_MIN_HEIGHT) * 0.3],
            'clamp'
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
            [2, 1, 0.8],
            'clamp'
          ),
        },
      ],
    };
  });

  const gradientColors = colorScheme === 'dark' 
    ? ['#4ECDC4', '#45B7D1', '#FF6B6B'] 
    : ['#FF6B6B', '#4ECDC4', '#45B7D1'];

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottom }]}>
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: headerBackgroundColor[colorScheme] },
          headerAnimatedStyle,
        ]}>
        <LinearGradient
          colors={gradientColors}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {headerImage}
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingTop: HEADER_HEIGHT + 20,
    paddingHorizontal: 20,
    gap: 16,
  },
});

