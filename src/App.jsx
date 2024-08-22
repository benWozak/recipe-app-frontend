import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from "./components/layout"

const Home = lazy(() => import("./views/Home"));
const RecipeList = lazy(() => import("./views/RecipeList"));
const RecipeDetails = lazy(() => import("./views/RecipeDetails"));
const RecipeEditor = lazy(() => import("./views/RecipeEditor"));

// TODO: update Loading fallback
const Loading = () => (
  <div className="mx-auto h-svh">
    <div className="flex flex-col justify-center items-center h-5/6">
      <h1 className="text-3xl font-bold">Loading...</h1>
    </div>
  </div>
);

function App() {

  return (
    <Router>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Description of your PWA" />

        {/* <!-- iOS meta tags --> */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="PWA Title" />

        {/* <!-- Microsoft Tiles --> */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />

        {/* <!-- Favicon and Apple Touch Icons --> */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* <!-- Web App Manifest --> */}
        <link rel="manifest" href="/manifest.json" />
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="list" element={<RecipeList />} />
            <Route path="details" element={<RecipeDetails />} />
            <Route path="editor" element={<RecipeEditor />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
