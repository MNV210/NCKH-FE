import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

// import Layout from "@/routes/layout";
// import ListCategory from "./routes/home/ListCategory";
import QuizPage from "./routes/home/QuizPage";
import Category from "./routes/category/Category";
import HomePage from "./routes/home/HomePage";
import ContentOfCategory from "./routes/category/ContentOfCategory";

// import DashboardPage from "@/routes/dashboard/page";

 // Import ExerciseInfoPage

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            index: true,
            element: <HomePage />,
        },
        {
            path: "/categories",
            index: true,
            element: <Category />,
        },
        {
            path: "subcategory/:name/:id",
            element: <ContentOfCategory />
        },
        {
            path: "test/:id",
            element: <QuizPage />
        },
        // {
        //     path: "/dashboard",
        //     element: <ContentOfCategory />,
        // }
        // {
        //     path: "/editor",
        //     element: <Editor />
        // },

        // {
        //     path: "/login", // Move login path outside of layout
        //     element: <LoginPage />, // Add LoginPage element
        // },
        // {
        //     path: "/",
        //     element: <Layout />,
        //     children: [
        //         {
        //             index: true,
        //             element: <CourseList />,
        //         },
        //         {
        //             path: "courses",
        //             index: true,
        //             element: <CoursePage />,
        //         },
        //         {
        //             path: "courses/:courseId",
        //             element: <CourseCurriculum />
        //         },
        //         {
        //             path:`/learn/:slug/:lessonId`,
        //             element: <LearnPage/>
        //         },
        //         {
        //             path:`/bai-kiem-tra`,
        //             element: <ListExercise/>
        //         },
        //         {
        //             path:`/quiz/:exerciseId`,
        //             element: <MakeExercise/>
        //         },
        //         {
        //             path:`/exercise_result/:exerciseId`,
        //             element:<TestResult/>
        //         },
        //         {
        //             path: "/profile",
        //             element: <ProfilePage />,
        //         }
        //     ],
            
        // },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
