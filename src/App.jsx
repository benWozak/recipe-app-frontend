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
      {/* <Helmet>
      </Helmet> */}
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
