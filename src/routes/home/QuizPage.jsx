import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tests } from '../../api/TestApi';

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const param = useParams();
    const getQuestionByTestId = async (id) => {
        setIsLoading(true);
        const response = await Tests.getQuestionByTestId(id);
        setQuestions(response);
        setIsLoading(false);   
    };
    // Mock data - replace with API call
    useEffect(() => {
        getQuestionByTestId(param.id);
        // Simulate API fetch
        // setTimeout(() => {
        //     const mockQuestions = [
        //         {
        //             id: 1,
        //             question: "What is the capital of France?",
        //             options: [
        //                 { id: "a", text: "London" },
        //                 { id: "b", text: "Berlin" },
        //                 { id: "c", text: "Paris" },
        //                 { id: "d", text: "Madrid" }
        //             ],
        //             correctAnswer: "c"
        //         },
        //         {
        //             id: 2,
        //             question: "Which planet is known as the Red Planet?",
        //             options: [
        //                 { id: "a", text: "Venus" },
        //                 { id: "b", text: "Mars" },
        //                 { id: "c", text: "Jupiter" },
        //                 { id: "d", text: "Saturn" }
        //             ],
        //             correctAnswer: "b"
        //         },
        //         {
        //             id: 3,
        //             question: "What is the largest mammal?",
        //             options: [
        //                 { id: "a", text: "Elephant" },
        //                 { id: "b", text: "Giraffe" },
        //                 { id: "c", text: "Blue Whale" },
        //                 { id: "d", text: "Hippopotamus" }
        //             ],
        //             correctAnswer: "c"
        //         },
        //         {
        //             id: 4,
        //             question: "Which element has the chemical symbol 'O'?",
        //             options: [
        //                 { id: "a", text: "Gold" },
        //                 { id: "b", text: "Iron" },
        //                 { id: "c", text: "Oxygen" },
        //                 { id: "d", text: "Osmium" }
        //             ],
        //             correctAnswer: "c"
        //         },
        //         {
        //             id: 5,
        //             question: "Who painted the Mona Lisa?",
        //             options: [
        //                 { id: "a", text: "Vincent van Gogh" },
        //                 { id: "b", text: "Pablo Picasso" },
        //                 { id: "c", text: "Leonardo da Vinci" },
        //                 { id: "d", text: "Michelangelo" }
        //             ],
        //             correctAnswer: "c"
        //         }
        //     ];
            
        //     setQuestions(mockQuestions);
        //     setIsLoading(false);
        // }, 500);
    }, []);

    // Timer countdown
    // useEffect(() => {
    //     if (timeLeft <= 0 || showResults) {
    //         return;
    //     }

    //     const timer = setTimeout(() => {
    //         setTimeLeft(prevTime => prevTime - 1);
    //     }, 1000);

    //     return () => clearTimeout(timer);
    // }, [timeLeft, showResults]);

    // Format time to mm:ss
    // const formatTime = (seconds) => {
    //     const minutes = Math.floor(seconds / 60);
    //     const remainingSeconds = seconds % 60;
    //     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    // };

    // Handle answer selection
    const handleAnswerSelection = (questionId, answerId) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answerId
        }));
    };

    // Navigate to next question
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    // Navigate to previous question
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    // Submit quiz
    const handleSubmit = () => {
        let newScore = 0;
        questions.forEach(question => {
            if (selectedAnswers[question.id] === question.answer) {
                newScore += 1;
            }
        });
        
        setScore(newScore);
        setShowResults(true);
    };

    // Restart quiz
    // const handleRestartQuiz = () => {
    //     setSelectedAnswers({});
    //     setCurrentQuestionIndex(0);
    //     setScore(0);
    //     setShowResults(false);
    //     setTimeLeft(300);
    // };

    // Go back to home
    const handleGoHome = () => {
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-lg">Loading questions...</p>
                </div>
            </div>
        );
    }

    // Show results page
    if (showResults) {
        return (
            <div className="min-h-screen bg-gray-100 py-8 px-4">
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Quiz Results</h1>
                        
                        <div className="text-center mb-8">
                            <div className="text-5xl font-bold mb-2 text-blue-600">{score}/{questions.length}</div>
                            <p className="text-xl text-gray-600">Your Score: {Math.round((score / questions.length) * 100)}%</p>
                        </div>
                        
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Review Your Answers:</h2>
                            
                            {questions?.map((question, index) => (
                                <div key={question.id} className="mb-6 p-4 border rounded-lg">
                                    <p className="font-medium mb-2">
                                        Question {index + 1}: {question.question}
                                    </p>
                                    
                                    <div className="ml-4">
                                        <p className="text-gray-600">Your answer: 
                                            <span className={
                                                selectedAnswers[question.id] === question.correctAnswer
                                                    ? "text-green-600 font-medium ml-2"
                                                    : "text-red-600 font-medium ml-2"
                                            }>
                                                {question.option1 === selectedAnswers[question.id] ? question.option1 : 
                                                 question.option2 === selectedAnswers[question.id] ? question.option2 : 
                                                 question.option3 === selectedAnswers[question.id] ? question.option3 : 
                                                 question.option4 === selectedAnswers[question.id] ? question.option4 : "Not answered"}
                                            </span>
                                        </p>
                                        
                                        {selectedAnswers[question.id] !== question.correctAnswer && (
                                            <p className="text-gray-600">
                                                Correct answer: 
                                                <span className="text-green-600 font-medium ml-2">
                                                    {question.option1 === question.correctAnswer ? question.option1 : 
                                                     question.option2 === question.correctAnswer ? question.option2 : 
                                                     question.option3 === question.correctAnswer ? question.option3 : 
                                                     question.option4 === question.correctAnswer ? question.option4 : ""}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex justify-center space-x-4">
                            {/* <button
                                onClick={handleRestartQuiz}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                            >
                                Restart Quiz
                            </button> */}
                            <button
                                onClick={handleGoHome}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                            >
                                Go to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // If no questions are loaded
    if (questions.length === 0) {
        return <div>No questions available</div>;
    }

    // Current question
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header with progress and timer */}
                <div className="bg-blue-600 p-4 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="font-medium">Question {currentQuestionIndex + 1}/{questions.length}</span>
                            <div className="w-full bg-blue-300 rounded-full h-2 mt-2">
                                <div 
                                    className="bg-white rounded-full h-2" 
                                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                        {/* <div className="text-xl font-medium">
                            Time: {formatTime(timeLeft)}
                        </div> */}
                    </div>
                </div>
                
                {/* Question and answers */}
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
                    
                    <div className="space-y-3">
                        {currentQuestion?.option1 && (
                            <div 
                                key={currentQuestion.option1}
                                className={`
                                    p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                                    ${selectedAnswers[currentQuestion.id] === currentQuestion.option1 ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                                `}
                                onClick={() => handleAnswerSelection(currentQuestion.id, currentQuestion.option1)}
                            >
                                <div className="flex items-center">
                                    <div className={`
                                        w-6 h-6 flex items-center justify-center rounded-full border mr-3
                                        ${selectedAnswers[currentQuestion.id] === currentQuestion.option1 ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400'}
                                    `}>
                                        A
                                    </div>
                                    <span>{currentQuestion.option1}</span>
                                </div>
                            </div>
                        )}
                        {currentQuestion?.option2 && (
                            <div 
                                key={currentQuestion.option2}
                                className={`
                                    p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                                    ${selectedAnswers[currentQuestion.id] === currentQuestion.option2 ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                                `}
                                onClick={() => handleAnswerSelection(currentQuestion.id, currentQuestion.option2)}
                            >
                                <div className="flex items-center">
                                    <div className={`
                                        w-6 h-6 flex items-center justify-center rounded-full border mr-3
                                        ${selectedAnswers[currentQuestion.id] === currentQuestion.option2 ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400'}
                                    `}>
                                        B
                                    </div>
                                    <span>{currentQuestion.option2}</span>
                                </div>
                            </div>
                        )}
                        {currentQuestion?.option3 && (
                            <div 
                                key={currentQuestion.option3}
                                className={`
                                    p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                                    ${selectedAnswers[currentQuestion.id] === currentQuestion.option3 ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                                `}
                                onClick={() => handleAnswerSelection(currentQuestion.id, currentQuestion.option3)}
                            >
                                <div className="flex items-center">
                                    <div className={`
                                        w-6 h-6 flex items-center justify-center rounded-full border mr-3
                                        ${selectedAnswers[currentQuestion.id] === currentQuestion.option3 ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400'}
                                    `}>
                                        C
                                    </div>
                                    <span>{currentQuestion.option3}</span>
                                </div>
                            </div>
                        )}
                        {currentQuestion?.option4 && (
                            <div 
                                key={currentQuestion.option4}
                                className={`
                                    p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                                    ${selectedAnswers[currentQuestion.id] === currentQuestion.option4 ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                                `}
                                onClick={() => handleAnswerSelection(currentQuestion.id, currentQuestion.option4)}
                            >
                                <div className="flex items-center">
                                    <div className={`
                                        w-6 h-6 flex items-center justify-center rounded-full border mr-3
                                        ${selectedAnswers[currentQuestion.id] === currentQuestion.option4 ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400'}
                                    `}>
                                        D
                                    </div>
                                    <span>{currentQuestion.option4}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Navigation buttons */}
                <div className="px-6 pb-6 flex justify-between">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={`
                            py-2 px-4 rounded-lg font-medium
                            ${currentQuestionIndex === 0
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-600 text-white hover:bg-gray-700 transition-colors'}
                        `}
                    >
                        Previous
                    </button>
                    
                    {currentQuestionIndex === questions.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                        >
                            Submit Quiz
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                        >
                            Next
                        </button>
                    )}
                </div>
                
                {/* Question navigation dots */}
                <div className="px-6 pb-6">
                    <div className="flex justify-center space-x-2">
                        {questions?.map((q, index) => (
                            <button
                                key={q.id}
                                onClick={() => setCurrentQuestionIndex(index)}
                                className={`
                                    w-8 h-8 rounded-full text-sm font-medium
                                    ${currentQuestionIndex === index
                                        ? 'bg-blue-600 text-white'
                                        : selectedAnswers[q.id]
                                            ? 'bg-blue-100 text-blue-800 border border-blue-500'
                                            : 'bg-gray-200 text-gray-700'}
                                `}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizPage;