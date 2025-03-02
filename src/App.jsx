import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

// import Layout from "@/routes/layout";
import ListCategory from "./routes/home/ListCategory";
import ContentOfCategory from "./routes/home/ContentOfCategory";
import QuizPage from "./routes/home/QuizPage";
// import DashboardPage from "@/routes/dashboard/page";

 // Import ExerciseInfoPage

function App() {
    const router = createBrowserRouter([

        {
            path: "/",
            index: true,
            element: <ListCategory />,
        },
        {
            path: "category/:id",
            element: <ContentOfCategory />
        },
        {
            path: "test/:id",
            element: <QuizPage />
        },

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
