# Redcare Pharmacy Challenge

Frontend Coding Challenge for Redcare Pharmacy.

## Task requirements

> The idea of this project is to implement a small client application for discovering trending repositories on GitHub.

> A list of the most popular repositories of the last week should be displayed and the user should be able to star them. The starred repositories should be visible either through a filter or in a different tab. Some basic information about the repo should be displayed, such as: repo name, link to GitHub, description and number of stars. To keep things simple, the starring won’t be sent back to GitHub’s servers but just stored in local storage.


For more information, please check the [PDF](./public/challenge.pdf).


## 💻 Setup and run


1. ‼️ Make sure you have the `.env` file on the root of the project. There's an `env.example` from which you can setup the variables.


1. Download and install this repo

   `npm i`


1. Run the project locally

   `npm run dev`

## 📚 Stack

- React
- Typescript
- NextJS
- Jest
- React Testing Library
- Tailwind

## 📂 Folder structure

```
🚨 `index` files only do import/exports
```

### Application

```
.
├── assets
├── public
├── src
│   └── app
│       ├── __mocks__   // mocks for tests
│       ├── assets  
│       ├── components  // components to be used in multiple places
│       ├── config  
│       ├── data        // Backend communication
│       ├── hooks
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── ...
├── .env
├── .nvmrc
└── package.json
```

### Component

```
.
└── Component
    ├── Component.tsx     // implementation
    ├── Component.test.tsx // unit test
    └── index.tsx          // exports
```


## 🎨 Styling

Due to limited time constraints, the tool of choice was inline Tailwind to gain speed. A trade-off is that this approach makes it harder to read and debug styles. Using tools like prettier may help with that.
My preferred architecture would be using CSS modules, creating a Component.style.ts file, for the encapsulation and flexibility it provides.

## 🧪 Testing

Stack: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)

### Integration test

Due to time contraint E2E tests were not implements.


## 👣 Next steps

- Integration tests
- Accessibility tests with Axe
- Eslint configuration
- Prettier for Tailwind
- Improve Error handling

