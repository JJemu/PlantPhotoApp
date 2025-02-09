# Plant Photo App

Plant Photo App is a React Native application that allows users to capture and manage photos of their plants. Users can add, view, edit, and delete plant photos, with the ability to add notes and other details for each plant.

## Features

- Capture photos of plants using your camera
- View plant photos in a gallery-like grid
- Edit plant details, including name and notes and delete them
- Persistent storage using AsyncStorage
- Bottom navigation bar for easy navigation between screens

## Screenshots
<img src="https://github.com/user-attachments/assets/a83a04bd-c07a-494a-90d6-7efbd1c8e9ba" width="200">
<img src="https://github.com/user-attachments/assets/1198416d-9c21-459a-b054-92b0d942ba84" width="200">
<img src="https://github.com/user-attachments/assets/457c4639-2be4-4968-bda7-ef033ce4a32b" width="200">
<img src="https://github.com/user-attachments/assets/9c7cb4f0-b8d8-4808-acb8-3c817ea9ce33" width="200">
<img src="https://github.com/user-attachments/assets/7bb1095d-c998-4e55-b675-5b3b6fb102eb" width="200">
<img src="https://github.com/user-attachments/assets/b685eadf-2aa7-41b7-a92e-54efde08ceef" width="200">

## Installation and usage

1. Clone the repository
2. Install dependencies with:
   `npm install` and `npx pod-install` if need to run on iOS
3. Run the app in your device or emulator with:
   `npm run android` or `npm run ios`
5. Use the bottom navigation bar to switch between screens.
6. On the List screen, tap the "Add Plant" button to capture a new plant photo.
7. Fill in the plant details and save.
8. Tap on a plant photo to view and edit its details.
9. Use the "Delete Plant" button to remove a plant photo.

## Project Structure
```├── App.tsx
├── source
│   ├── components
│   │   └── Button.tsx
│   ├── context
│   │   └── PlantContext.tsx
│   ├── navigation
│   │   ├── AppStackNavigator.tsx
│   │   └── BottomNavBar.tsx
│   ├── screens
│   │   ├── DetailsScreen.tsx
│   │   ├── ListScreen.tsx
│   │   ├── ScanScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── theme
│   │   └── Theme.ts
└── README.md
```

## Dependencies
- React Native
- React Navigation
- Styled Components
- AsyncStorage
- React Native Vector Icons
- React Native Image Picker
