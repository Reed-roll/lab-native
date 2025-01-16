import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Linking, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

// Define navigation types
type RootStackParamList = {
  Exercise: { lawNumber: number };
  Material: undefined;
};

type MaterialScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Material'>;

const Material: React.FC = () => {
  const navigation = useNavigation<MaterialScreenNavigationProp>();
  const [expandedItem, setExpandedItem] = React.useState<number | null>(null);
  const animatedValues = React.useRef(
    Array(3).fill(0).map(() => new Animated.Value(0))
  ).current;

  const toggleExpand = (index: number) => {
    if (expandedItem === index) {
      Animated.timing(animatedValues[index], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setExpandedItem(null);
    } else {
      if (expandedItem !== null) {
        Animated.timing(animatedValues[expandedItem], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setExpandedItem(index);
    }
  };

  const openVideo = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Can't open URL: " + url);
      }
    } catch (error) {
      console.error("Error opening URL: ", error);
    }
  };

  const navigateToExercise = (lawNumber: number) => {
    navigation.navigate('Exercise', { lawNumber });
  };

  const materials = [
    {
      title: "Newton's First Law",
      shortContent: "An object will remain at rest or in uniform motion unless acted upon by an external force.",
      fullContent: "Hukum I Newton menjelaskan bahwa setiap benda yang diam akan tetap diam, dan setiap benda yang sedang bergerak akan terus bergerak, selama nggak ada resultan gaya yang diberikan atau bekerja pada benda tersebut.\n\nKarena resultan gaya yang bekerja pada benda sama dengan nol, maka benda tersebut nggak memiliki percepatan, atau percepatannya nol. Oleh karena itu, secara matematis, Hukum I Newton bisa ditulis dengan persamaan ∑F = 0.",
      icon: "motion-photos-on",
      formula: "∑F = 0",
      videoUrl: "https://youtu.be/JGO_zDWmkvk?si=5Z8Cd9S_MIaB7cGE",
      lawNumber: 1,
      gradientColors: ['#FF9A8B', '#FF6A88'],
    },
    {
      title: "Newton's Second Law",
      shortContent: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
      fullContent: "Hukum II Newton berkaitan dengan keadaan benda yang bergerak, di mana massa benda dan gaya yang diberikan pada benda tersebut diperhitungkan. Hukum ini juga menjelaskan bahwa ketika resultan gaya yang bekerja pada suatu benda nggak sama dengan nol, maka benda tersebut akan bergerak dengan suatu percepatan tertentu. Artinya, benda yang bergerak ini memiliki percepatan, ya.",
      icon: "speed",
      formula: "F = m × a",
      videoUrl: "https://youtu.be/kKKM8Y-u7ds?si=H23-fy4ukbJag0v5",
      lawNumber: 2,
      gradientColors: ['#FAD0C4', '#FFD1FF'],
    },
    {
      title: "Newton's Third Law",
      shortContent: "For every action, there is an equal and opposite reaction.",
      fullContent: "Hukum III Newton ini berkaitan dengan gaya aksi dan reaksi. Maksudnya adalah setiap benda yang kita berikan gaya aksi, maka benda tersebut akan kembali memberikan gaya reaksi yang sama besar terhadap kita. Tapi inget ya, arahnya berlawanan. Jadi, Hukum III Newton dapat ditulis dengan persamaan Faksi = -Freaksi.\n\nContoh dari Hukum III Newton ini adalah pada saat kamu mendayung perahu. Coba perhatikan deh. Sewaktu kamu menggerakkan dayung ke arah belakang, perahu yang kamu kendarai akan bergerak ke depan. Hal ini terjadi karena ada gaya aksi yang kita berikan melalui dayung (kita mendayung adalah gaya aksi), sehingga perahu akan memberikan gaya reaksi yang sama besar tetapi arahnya berlawanan, yaitu dengan bergerak ke depan.",
      icon: "compare-arrows",
      formula: "Faksi = -Freaksi",
      videoUrl: "https://youtu.be/g550H4e5FCY?si=elQoB0CKSuaotoCa",
      lawNumber: 3,
      gradientColors: ['#A1C4FD', '#C2E9FB'],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.header}
      >
        <Text style={styles.title}>Hukum Newton</Text>
        <Text style={styles.subtitle}>Dasar-Dasar Fisika</Text>
      </LinearGradient>

      {materials.map((material, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.materialItem,
            expandedItem === index && styles.materialItemExpanded
          ]}
          onPress={() => toggleExpand(index)}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={material.gradientColors}
            style={styles.materialHeader}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          >
            <View style={styles.iconContainer}>
              <Icon name={material.icon} size={24} color="#fff" />
            </View>
            <Text style={styles.materialTitle}>{material.title}</Text>
            <Icon 
              name={expandedItem === index ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
              size={24} 
              color="#fff" 
            />
          </LinearGradient>
          
          <Animated.View
            style={{
              maxHeight: animatedValues[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1000],
              }),
              opacity: animatedValues[index],
              overflow: 'hidden',
            }}
          >
            <View style={styles.formulaContainer}>
              <Icon name="functions" size={20} color="#4c669f" />
              <Text style={styles.formula}>{material.formula}</Text>
            </View>
            
            <Text style={styles.materialContent}>
              {material.fullContent}
            </Text>
            
            <View style={styles.materialFooter}>
              <TouchableOpacity 
                style={[styles.button, styles.watchButton]}
                onPress={() => openVideo(material.videoUrl)}
              >
                <Icon name="play-circle-filled" size={20} color="#fff" />
                <Text style={styles.buttonText}>Tonton Video</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.exerciseButton]}
                onPress={() => navigateToExercise(material.lawNumber)}
              >
                <Icon name="assignment" size={20} color="#fff" />
                <Text style={styles.buttonText}>Latihan Soal</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 4,
    opacity: 0.8,
  },
  materialItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  materialItemExpanded: {
    elevation: 5,
    shadowOpacity: 0.2,
  },
  materialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  materialTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  formulaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
  },
  formula: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '500',
    color: '#4c669f',
  },
  materialContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    lineHeight: 22,
    color: '#333',
    fontSize: 16,
  },
  materialFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  watchButton: {
    backgroundColor: '#4c669f',
  },
  exerciseButton: {
    backgroundColor: '#192f6a',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
});

export default Material;
