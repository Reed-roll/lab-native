import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';

interface Question {
  id: number;
  law: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const ExerciseScreen: React.FC = () => {
  const [currentLaw, setCurrentLaw] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<number | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));

  const questions: Question[] = [
    // ... (keep the existing questions array)
  ];

  const filteredQuestions = questions.filter(q => q.law === currentLaw);

  const handleAnswer = (questionId: number, selectedAnswer: number) => {
    if (answeredQuestions.includes(questionId)) {
      return;
    }

    const question = questions.find(q => q.id === questionId);
    if (question) {
      if (selectedAnswer === question.correctAnswer) {
        setScore(score + 1);
        Alert.alert('Benar!', 'Jawaban kamu tepat!');
      } else {
        Alert.alert('Kurang Tepat', 'Jangan menyerah, coba lagi!');
      }
      setShowExplanation(questionId);
      setAnsweredQuestions([...answeredQuestions, questionId]);
    }
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentLaw]);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1a237e', '#3949ab']}
        style={styles.header}
      >
        <Text style={styles.title}>Latihan Soal</Text>
        <Text style={styles.subtitle}>Hukum Newton {currentLaw}</Text>
      </LinearGradient>

      <View style={styles.tabContainer}>
        {[1, 2, 3].map((law) => (
          <TouchableOpacity
            key={law}
            style={[
              styles.tab,
              currentLaw === law && styles.activeTab
            ]}
            onPress={() => setCurrentLaw(law)}
          >
            <Text style={[
              styles.tabText,
              currentLaw === law && styles.activeTabText
            ]}>
              Hukum {law}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.scoreContainer}>
        <Icon name="stars" size={24} color="#FFD700" />
        <Text style={styles.scoreText}>Skor: {score}/{questions.length}</Text>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        {filteredQuestions.map((question, index) => (
          <View key={question.id} style={styles.questionCard}>
            <Text style={styles.questionNumber}>Soal {index + 1}</Text>
            <Text style={styles.questionText}>{question.question}</Text>
            
            <View style={styles.optionsContainer}>
              {question.options.map((option, optionIndex) => (
                <TouchableOpacity
                  key={optionIndex}
                  style={[
                    styles.optionButton,
                    answeredQuestions.includes(question.id) && 
                    optionIndex === question.correctAnswer && 
                    styles.correctOption,
                    answeredQuestions.includes(question.id) && 
                    optionIndex !== question.correctAnswer && 
                    styles.wrongOption,
                  ]}
                  onPress={() => handleAnswer(question.id, optionIndex)}
                  disabled={answeredQuestions.includes(question.id)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {showExplanation === question.id && (
              <View style={styles.explanationContainer}>
                <Text style={styles.explanationTitle}>Penjelasan:</Text>
                <Text style={styles.explanationText}>{question.explanation}</Text>
              </View>
            )}
          </View>
        ))}
      </Animated.View>
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
  tabContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    borderRadius: 25,
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    padding: 10,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#3949ab',
  },
  tabText: {
    color: '#3949ab',
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scoreText: {
    color: '#333',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  questionCard: {
    margin: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionNumber: {
    color: '#3949ab',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionText: {
    color: '#333',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  correctOption: {
    backgroundColor: '#c8e6c9',
    borderColor: '#81c784',
  },
  wrongOption: {
    backgroundColor: '#ffcdd2',
    borderColor: '#e57373',
  },
  optionText: {
    color: '#333',
    fontSize: 16,
  },
  explanationContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
  },
  explanationTitle: {
    color: '#1565c0',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  explanationText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ExerciseScreen;

