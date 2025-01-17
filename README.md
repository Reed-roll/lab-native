# PhyLab

## Introduction
**PhyLab** is a virtual lab application designed to provide an interactive and comprehensive learning experience for physics students, focusing on Newton's Laws. The application integrates simulations, exercises, and learning materials to enhance conceptual understanding and engagement. PhyLab is accessible via both web and mobile platforms, ensuring flexibility and convenience for students to learn anytime, anywhere.

---

## Features
1. **Lab (Simulation):**
   - Provides interactive experiments for Newton's Laws, allowing students to visualize and explore concepts in real-time.

2. **Material:**
   - Offers well-structured learning modules, including text, videos, and infographics, to help students understand the theoretical foundations of Newton's Laws.

3. **Exercise:**
   - Includes a variety of practice questions with instant feedback and detailed explanations to test and reinforce students' understanding.

4. **Dashboard:**
   - Acts as a centralized hub for navigating between features and tracking learning progress.

5. **Progress Tracking:**
   - Displays scores and achievements to motivate students and measure their improvement over time.

---

## Installation

### Requirements:
- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **Expo CLI** (for mobile development)
- Compatible browser for the web version

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/Reed-roll/lab-native.git
   cd phylab
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   - For web:
     ```bash
     npm start
     ```
   - For mobile:
     ```bash
     expo start
     ```

---

## Usage
1. **Login:**
   - Enter your username and password to access the dashboard.
2. **Explore Materials:**
   - Navigate to the Material section to read or watch content about Newton's Laws.
3. **Run Simulations:**
   - Visit the Lab section to conduct virtual experiments.
4. **Practice Exercises:**
   - Test your knowledge in the Exercise section and receive instant feedback.
5. **Track Progress:**
   - View your scores and learning milestones on the dashboard.

---

## Technologies Used
- **Frontend:** React.js, TypeScript
- **Backend:** Firebase (Authentication, Firestore, Hosting)
- **Mobile:** React Native, Expo
- **Deployment:** EAS for mobile, Vercel/Netlify for web

---

## Testing
1. **Functional Testing:**
   - Ensure all features, such as simulations, exercises, and materials, work as intended.
2. **Non-Functional Testing:**
   - Usability testing to verify intuitive design.
   - Performance testing to ensure fast loading times.
   - Compatibility testing across devices and browsers.

---

## Contribution
We welcome contributions to PhyLab! If you would like to contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

## License
PhyLab is licensed under the [MIT License](LICENSE).

---

## Contact
For inquiries or support, feel free to contact us:
- **Email:** support@phylab.com
- **Website:** [www.phylab.com](http://www.phylab.com)

---

## Created By
| **Name**                    | **Student ID** |
|-----------------------------|----------------|
| Mattheuw Suciadi Wijaya     | 18222048       |
| Muhammad Ridho Rabbani      | 18222098       |


# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
