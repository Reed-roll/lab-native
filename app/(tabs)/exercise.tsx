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
    // Hukum Newton I
    {
      id: 1,
      law: 1,
      question: "Sebuah buku berada di atas meja dalam keadaan diam. Apa yang dapat kamu simpulkan tentang gaya-gaya yang bekerja pada buku tersebut?",
      options: [
        "Tidak ada gaya yang bekerja pada buku",
        "Gaya gravitasi lebih besar dari gaya normal",
        "Resultan gaya yang bekerja pada buku sama dengan nol",
        "Gaya normal lebih besar dari gaya gravitasi"
      ],
      correctAnswer: 2,
      explanation: "Berdasarkan Hukum I Newton, jika sebuah benda diam, maka resultan gaya yang bekerja pada benda tersebut sama dengan nol (∑F = 0). Dalam kasus ini, gaya gravitasi yang menarik buku ke bawah diimbangi oleh gaya normal dari meja yang mendorong ke atas."
    },
    {
      id: 2,
      law: 1,
      question: "Mengapa penumpang dalam mobil yang bergerak akan terdorong ke depan ketika mobil direm mendadak?",
      options: [
        "Karena gaya gravitasi menarik ke depan",
        "Karena Hukum I Newton tentang kelembaman",
        "Karena tekanan udara mendorong ke depan",
        "Karena gaya gesek ban mendorong ke depan"
      ],
      correctAnswer: 1,
      explanation: "Ini adalah contoh dari Hukum I Newton tentang kelembaman/inersia. Benda cenderung mempertahankan keadaan geraknya. Ketika mobil direm mendadak, tubuh penumpang cenderung mempertahankan gerak ke depan sesuai dengan keadaan sebelumnya."
    },
    {
      id: 3,
      law: 1,
      question: "Ketika sebuah kereta berhenti tiba-tiba, penumpang yang tidak menggunakan sabuk pengaman cenderung terlempar ke depan. Apa penyebab utama fenomena ini?",
      options: [
        "Gaya gesek pada kereta",
        "Hukum gravitasi",
        "Kelembaman tubuh penumpang",
        "Gaya normal dari kursi"
      ],
      correctAnswer: 2,
      explanation: "Berdasarkan Hukum I Newton, tubuh penumpang cenderung mempertahankan gerakannya karena kelembaman."
    },
    {
      id: 4,
      law: 1,
      question: "Jika sebuah benda berada dalam keadaan diam, apa yang dapat dikatakan tentang gaya-gaya yang bekerja pada benda tersebut?",
      options: [
        "Tidak ada gaya yang bekerja pada benda",
        "Resultan gaya pada benda adalah nol",
        "Semua gaya searah",
        "Benda tidak memiliki massa"
      ],
      correctAnswer: 1,
      explanation: "Hukum I Newton menyatakan bahwa benda diam memiliki resultan gaya nol (∑F = 0)."
    },
    {
      id: 5,
      law: 1,
      question: "Mengapa sebuah bola akan berhenti jika digulirkan di lantai kasar?",
      options: [
        "Karena gaya gravitasi",
        "Karena adanya gaya gesek",
        "Karena benda tidak memiliki inersia",
        "Karena gaya normal dari lantai"
      ],
      correctAnswer: 1,
      explanation: "Gesekan dengan permukaan lantai mengurangi energi kinetik bola hingga berhenti."
    },
    // Hukum Newton II
    {
      id: 6,
      law: 2,
      question: "Jika gaya sebesar 10 N bekerja pada benda bermassa 2 kg, berapakah percepatan yang dialami benda tersebut?",
      options: [
        "2 m/s²",
        "5 m/s²",
        "8 m/s²",
        "20 m/s²"
      ],
      correctAnswer: 1,
      explanation: "Berdasarkan Hukum II Newton (F = m × a), jika F = 10 N dan m = 2 kg, maka a = F/m = 10/2 = 5 m/s². Semakin besar gaya yang diberikan, semakin besar percepatan yang dihasilkan."
    },
    {
      id: 7,
      law: 2,
      question: "Apa yang terjadi pada percepatan sebuah benda jika gaya yang bekerja tetap tetapi massanya diperbesar dua kali lipat?",
      options: [
        "Percepatan menjadi dua kali lebih besar",
        "Percepatan menjadi setengah kali lebih kecil",
        "Percepatan tetap sama",
        "Percepatan menjadi nol"
      ],
      correctAnswer: 1,
      explanation: "Sesuai Hukum II Newton, percepatan berbanding terbalik dengan massa (a = F/m). Jika massa diperbesar dua kali lipat sementara gaya tetap, maka percepatan akan menjadi setengah dari nilai sebelumnya."
    },
    {
      id: 8,
      law: 2,
      question: "Jika massa sebuah mobil 1000 kg dan percepatannya 2 m/s², berapa gaya yang dibutuhkan untuk mendorong mobil tersebut?",
      options: [
        "2000 N",
        "500 N",
        "1000 N",
        "4000 N"
      ],
      correctAnswer: 1,
      explanation: "Dengan F = m × a, gaya = 1000 × 2 = 2000 N."
    },
    {
      id: 9,
      law: 2,
      question: "Jika gaya pada benda adalah 15 N dan percepatan 3 m/s², berapa massa benda tersebut?",
      options: [
        "2 kg",
        "5 kg",
        "10 kg",
        "15 kg"
      ],
      correctAnswer: 2,
      explanation: "Menggunakan F = m × a, massa = F/a = 15/3 = 5 kg."
    },
    {
      id: 10,
      law: 2,
      question: "Jika gaya yang bekerja pada benda digandakan, tetapi massanya tetap, apa yang akan terjadi pada percepatan benda tersebut?",
      options: [
        "Tetap",
        "Berkurang setengah",
        "Bertambah dua kali",
        "Menjadi nol"
      ],
      correctAnswer: 3,
      explanation: "Percepatan berbanding lurus dengan gaya, sehingga jika gaya digandakan, percepatan juga meningkat dua kali lipat."
    },
  
    // Hukum Newton III
    {
      id: 11,
      law: 3,
      question: "Ketika seorang anak melompat dari perahu kecil ke dermaga, perahu akan bergerak ke arah berlawanan. Hukum Newton manakah yang menjelaskan fenomena ini?",
      options: [
        "Hukum I Newton",
        "Hukum II Newton",
        "Hukum III Newton",
        "Bukan termasuk Hukum Newton"
      ],
      correctAnswer: 2,
      explanation: "Ini adalah contoh Hukum III Newton. Ketika anak memberikan gaya aksi dengan melompat ke depan, perahu mendapatkan gaya reaksi yang sama besar dengan arah berlawanan, menyebabkan perahu bergerak ke belakang."
    },
    {
      id: 12,
      law: 3,
      question: "Saat kamu mendorong dinding, mengapa dinding juga mendorongmu kembali?",
      options: [
        "Karena dinding lebih kuat",
        "Karena ada gaya gravitasi",
        "Karena adanya gaya aksi-reaksi",
        "Karena dinding tidak bergerak"
      ],
      correctAnswer: 2,
      explanation: "Ini adalah aplikasi dari Hukum III Newton tentang gaya aksi-reaksi. Ketika kamu memberikan gaya aksi pada dinding, dinding memberikan gaya reaksi yang sama besar dengan arah berlawanan padamu (Faksi = -Freaksi)."
    },
    {
      id: 13,
      law: 3,
      question: "Ketika kamu mendayung perahu ke depan, perahu bergerak ke belakang. Mengapa hal ini terjadi?",
      options: [
        "Karena perahu mendorong air",
        "Karena gaya aksi-reaksi",
        "Karena gaya gravitasi",
        "Karena gaya normal"
      ],
      correctAnswer: 2,
      explanation: "Ini adalah contoh gaya aksi-reaksi. Gaya aksi mendayung menghasilkan reaksi dari air yang mendorong perahu ke depan."
    },
    {
      id: 14,
      law: 3,
      question: "Mengapa roket dapat bergerak di luar angkasa, meskipun tidak ada udara di sekitarnya?",
      options: [
        "Karena gaya gravitasi",
        "Karena gaya aksi-reaksi dari gas yang dikeluarkan",
        "Karena dorongan dari luar angkasa",
        "Karena dorongan udara di dalam roket"
      ],
      correctAnswer: 2,
      explanation: "Roket bergerak berdasarkan Hukum III Newton, di mana gas yang dikeluarkan menghasilkan reaksi dorongan ke arah sebaliknya."
    },
    {
      id: 15,
      law: 3,
      question: "Apa yang terjadi ketika kamu memukul meja dengan tanganmu?",
      options: [
        "Meja memberikan reaksi dorongan pada tanganmu",
        "Tanganmu tidak merasakan apa-apa",
        "Meja tidak memberikan reaksi",
        "Tanganmu bergerak lebih cepat"
      ],
      correctAnswer: 1,
      explanation: "Hukum III Newton menyatakan bahwa gaya aksi (pukulan tangan) menghasilkan gaya reaksi dari meja yang dirasakan oleh tanganmu."
    }
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

