import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import QuestionsService from "./service";
import {Email,Error,Question,Success} from "./pages";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error/>,
        children: [
            {
                path: 'quiz/:questionId',
                element: <Question />,
                loader: async ({ params }) => {
                    const q = await new QuestionsService().getQuestion(+params.questionId);
                    if(!q) {
                        return redirect("/")
                    }
                    return {
                        question: q,
                        number: params.questionId
                    };
                  },
            },
            {
                path: '/email',
                element: <Email />,
            },
            {
                path: '/success',
                element: <Success />,
            },
        ]
    },
]);

export default router;