```markdown
# Around the U.S.

This is a responsive web application developed as part of the TripleTen Software Engineering bootcamp. The project showcases a social networking style landing page where users can share photos of places they've visited, like posts, and edit their profiles. 

In its latest iteration, the application was completely refactored using **Object-Oriented Programming (OOP)** principles and integrated with a **RESTful API** to ensure dynamic, real-time data synchronization.

## 🚀 Features

- **API Integration**: All data (user profile, avatar, cards, and likes) is fetched from and saved to a remote server, acting as the Single Source of Truth.
- **Profile & Avatar Management**: Users can update their name, professional description, and profile picture, with changes dynamically synced to the database.
- **Card Management**: 
  - Add new cards with titles and image links.
  - Delete user-owned cards (includes a UX-friendly confirmation popup).
- **Interactivity & State Sync**: 
  - Dynamic like/unlike functionality that communicates with the server before updating the UI.
  - Image popup for full-size viewing.
- **Enhanced UX/UI**: 
  - Loading states (e.g., "Saving...") during asynchronous API requests to provide clear feedback.
  - Smooth modal transitions and overlay/Escape key closing functionality.
- **Form Validation**: Robust client-side validation using custom OOP classes to ensure data integrity before submission.
- **Responsive Design**: The layout is fully responsive, optimized for desktop, tablet, and mobile devices following the BEM methodology.

## 🛠️ Technologies Used

- **HTML5**: Semantic structure.
- **CSS3**: Layout and styling using Flexbox, Grid, BEM methodology, and Media Queries.
- **JavaScript (ES6+)**:
  - **OOP Architecture**: Encapsulation of logic into modular classes (`Card`, `FormValidator`, `Section`, `Popup`, `Api`, etc.).
  - **Asynchronous JS**: `fetch` API, Promises (`.then`, `.catch`, `.finally`), and asynchronous state management.
  - DOM manipulation and event delegation.
- **Figma**: The project was built based on a professional design brief.

## 📂 Project Structure

```text
.
├── blocks/          # CSS files organized by BEM blocks
├── components/      # JavaScript classes (OOP architecture)
├── images/          # Image assets and icons
├── page/            # Main CSS and JS entry points (index.css, index.js)
├── vendor/          # Third-party fonts and normalize/reset files
├── .prettierignore  # Prettier formatting configuration
├── index.html       # Main HTML file
└── README.md        # Project documentation

```

## 🔧 Installation and Setup

**Clone the repository:**

```Bash
git clone https://github.com/caiquemurilo/web_project_around_pt.git
cd web_project_around_pt

```

**Open the project:**
Since this project uses ES6 modules (`import`/`export`), it is recommended to run it via a local server (like VS Code's "Live Server" extension) rather than opening the HTML file directly, to avoid CORS issues.

## 📝 Learning Objectives

During the development of this project, I focused on:

* **Software Architecture**: Transitioning from procedural code to Object-Oriented Programming (OOP) and adhering to SOLID principles (Separation of Concerns).
* **Asynchronous Data Flow**: Handling API requests and mastering the lifecycle of Promises.
* **State Synchronization**: Preventing DOM and Server desynchronization (resolving chronological rendering order bugs) and ensuring the database remains the absolute source of truth.
* **UX Engineering**: Implementing loading states and robust error handling for network requests.
* **Modular CSS**: Implementing maintainable styles with the BEM naming convention.

---

*Developed by Caique Murilo Sacramento*

```

```