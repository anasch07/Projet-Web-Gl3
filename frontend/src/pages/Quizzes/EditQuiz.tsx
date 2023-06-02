import React, { useEffect, useState } from 'react';
import { Loader, Plus, X } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import CoursesTable from '../../components/courses/CoursesTable';
import Layout from '../../components/layout';
import Modal from '../../components/shared/Modal';
import useAuth from '../../hooks/useAuth';
import CreateCourseRequest from '../../models/course/CreateCourseRequest';
import contentService from '../../services/ContentService';
import ContentService from '../../services/ContentService';
import courseService from '../../services/CourseService';
import QuizService from '../../services/QuizService';
import {useParams} from "react-router";

export default function EditQuiz() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [scheduleDate, setScheduleDate] = useState<Date>();
    const [deadlineDate, setDeadlineDate] = useState<Date>();
    const [chapterId, setChapterId] = useState<string>();
    const [quizToEdit, setQuizToEdit] = useState<any>();

    const [addCourseShow, setAddCourseShow] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [data, setData] = useState<any>([]); // <== add this line
    const { authenticatedUser } = useAuth();

    const [questions, setQuestions] = useState([
        {
            question: '',
            options: [
                {
                    option: '',
                    isCorrect: false,
                },
            ],
        },
    ]);





    // const data: any = ContentService.findAllWithCourses().then((res) => {
    //   console.log('res: ', res);
    //   return res;
    // });
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        ContentService.findAllWithCourses().then((res) => {
            console.log('res: ', res);
            setData(res);
            if (res[0])
                setChapterId(res[0].id);
        });

        QuizService.findOne(id).then((res) => {
                console.log('res: ', res);
                if (res){
                    setQuizToEdit(res);
                }
        }
        );
    }, []);


    // if(quizToEdit){
    //     setTitle(quizToEdit.title);
    //     setDescription(quizToEdit.description);
    // }



    const handleSaveQuiz = async (e) => {
        e.preventDefault();
        //remove all null questions from quizToEdit
        let newQuestions = quizToEdit.questions.filter((question) => {
                return question.question !== '';
            }
        );
        quizToEdit.questions = newQuestions;
        //delete all null options from quizToEdit
        quizToEdit.questions.forEach((question) => {
                let newOptions = question.options.filter((option) => {
                        return option.display !== '';
                    }
                );
                question.options = newOptions;
            }
        );

        quizToEdit.chapterId = quizToEdit.chaptre.id;

        const res = await QuizService.update(id, quizToEdit);
        console.log('res: ', res);


        console.log('quizToEdit: ', quizToEdit);

    }


    const editAnswer = (
        questionIndex: number,
        answerIndex: number,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        let newQuestions = [...questions];
        newQuestions[questionIndex].options[answerIndex].option =
            event.target.value;
        setQuestions(newQuestions);
    };

    return (
        <Layout>
            <h1 className="font-semibold text-3xl mb-5">Add Quiz</h1>
            <hr />
            {quizToEdit && (
                <form onSubmit={handleSaveQuiz} className="mt-4 mb-4 p-4">
                <div className="mt-4 mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Chapter
                    </label>
                    {/*  slect from the chapters that the teacher has created */}
                    <select
                        id="chapter"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onChange={(e) => {
                            setQuizToEdit({
                                ...quizToEdit,
                                chaptre: {
                                    id: e.target.value,
                                },
                            });
                        }}
                        value={quizToEdit.chaptre.id}
                    >
                        {data && data.length > 0 ? (
                            data.map((item: any) => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.name} | {item.course.name}
                                    </option>
                                );
                            })
                        ) : (
                            <option value="test">No Chapters</option>
                        )}
                    </select>
                </div>

                <div className="mt-4 mb-6">
                    <label
                        htmlFor="Title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title"
                        required
                        value={quizToEdit ? quizToEdit.title : ''}
                        onChange={(e) => {
                            setQuizToEdit({
                                ...quizToEdit,
                                title: e.target.value,
                            });
                        }
                        }
                    />
                </div>
                <div className="mt-4 mb-6">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Description"
                        required
                        value={quizToEdit ? quizToEdit.description : ''}
                        onChange={(e) => {
                            setQuizToEdit({
                                ...quizToEdit,
                                description: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="mt-4 mb-6">
                    <label
                        htmlFor="scheduleDate"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Schedule Date
                    </label>
                    <input
                        type="date"
                        id="scheduleDate"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Schedule Date"
                        required
                        //format yyyy-mm-dd
                        value={quizToEdit ? new Date(quizToEdit.scheduleDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => {
                            setQuizToEdit({
                                ...quizToEdit,
                                // "format yyyy-mm-dd"
                                scheduleDate: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="mt-4 mb-6">
                    <label
                        htmlFor="scheduleTime"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Deadline Date
                    </label>
                    <input
                        type="date"
                        id="scheduleTime"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Schedule Time"
                        required
                        value={quizToEdit ? new Date(quizToEdit.deadlineDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => {
                            setQuizToEdit({
                                ...quizToEdit,
                                deadlineDate: e.target.value,
                            });
                        }}
                    />
                </div>

                {/*I want that the teacher add questions and options as much as he wants , so there is a button to add a question and a button to add an option */}
                {/*    show questions that isNotDeleted*/}
                {quizToEdit && quizToEdit.questions.length > 0  && quizToEdit.questions.map((question, questionIndex) => (
                    question && question.question && !question.isDeleted && (
                    <div
                        key={questionIndex}
                        className="border-2 border-gray-300 rounded-lg p-4 mb-4"
                    >
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
                            onClick={() => {
                                //edit the quiz ,if question have id add field to question delete isDeleted: true , else delete the question from the array
                                setQuizToEdit({
                                    ...quizToEdit,
                                    questions: quizToEdit.questions.map(
                                        (item, index) => {
                                            if (index === questionIndex) {
                                                if (item.id) {
                                                    return {
                                                        ...item,
                                                        isDeleted: true,
                                                    };
                                                } else {
                                                    //return empty object to delete the question from the array
                                                    return {
                                                        question: '',
                                                        options: [],
                                                        isDeleted: true,
                                                    };

                                                }
                                            } else {
                                                return item;
                                            }
                                        }
                                    ),
                                });
                            }}
                        >
                            {/*  icon to delete the question */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 inline-block"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <div className="mt-4 mb-6">
                            <label
                                htmlFor="Question"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Question {questionIndex + 1}
                            </label>
                            <input
                                type="text"
                                id="question"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={question.question}
                                onChange={(e) => {
                                    //edit the quiz
                                    setQuizToEdit({
                                        ...quizToEdit,
                                        questions: quizToEdit.questions.map(
                                            (item, index) => {
                                                if (index === questionIndex) {
                                                    return {
                                                        ...item,
                                                        question: e.target.value,
                                                    };
                                                } else {
                                                    return item;
                                                }
                                            }
                                        ),
                                    });
                                }}
                            />
                        </div>
                        {question.options.map((option, index) => (
                            option && option.display && !option.isDeleted && (
                            <div key={index}>
                                <div className="mt-4 mb-6 align-middle">
                                    <label
                                        htmlFor="Question"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Answer {index + 1}
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            checked={option.isCorrect}
                                            id={questionIndex.toString().concat('question')}
                                            name={questionIndex.toString().concat('question')}
                                            className="mr-2"
                                            onChange={(e) => {
                                                //edit the quiz
                                                setQuizToEdit({
                                                    ...quizToEdit,
                                                    questions: quizToEdit.questions.map(
                                                        (item, indexQuestion) => {
                                                            if (
                                                                indexQuestion ===
                                                                questionIndex
                                                            ) {
                                                                return {
                                                                    ...item,
                                                                    options: item.options.map(
                                                                        (
                                                                            optionItem,
                                                                            indexOption
                                                                        ) => {
                                                                            if (
                                                                                indexOption ===
                                                                                index
                                                                            ) {
                                                                                return {
                                                                                    ...optionItem,
                                                                                    isCorrect:
                                                                                        e
                                                                                            .target
                                                                                            .checked,
                                                                                };
                                                                            } else {
                                                                                return {
                                                                                    ...optionItem,
                                                                                    isCorrect: false,
                                                                                };
                                                                            }
                                                                        }
                                                                    ),
                                                                };
                                                            } else {
                                                                return item;
                                                            }
                                                        }
                                                    ),
                                                });
                                            }}
                                        />
                                        <input
                                            type="text"
                                            id="question"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                            onChange={(e) => {
                                                //edit the quiz
                                                setQuizToEdit({
                                                    ...quizToEdit,
                                                    questions: quizToEdit.questions.map(
                                                        (item, indexQuestion) => {
                                                            if (
                                                                indexQuestion ===
                                                                questionIndex
                                                            ) {
                                                                return {
                                                                    ...item,
                                                                    options: item.options.map(
                                                                        (
                                                                            optionItem,
                                                                            indexOption
                                                                        ) => {
                                                                            if (
                                                                                indexOption ===
                                                                                index
                                                                            ) {
                                                                                return {
                                                                                    ...optionItem,
                                                                                    display:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                };
                                                                            } else {
                                                                                return optionItem;
                                                                            }
                                                                        }
                                                                    ),
                                                                };
                                                            } else {
                                                                return item;
                                                            }
                                                        }
                                                    ),
                                                });
                                            }}
                                            value={option.display}
                                        />
                                        {/* icon to delete the option */}
                                        <button
                                            type="button"
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded  ml-1"
                                            onClick={() => {
                                                //edit the quiz
                                                setQuizToEdit({
                                                    ...quizToEdit,
                                                    questions: quizToEdit.questions.map(
                                                        (item, indexQuestion) => {
                                                            if (
                                                                indexQuestion ===
                                                                questionIndex
                                                            ) {
                                                                return {
                                                                    ...item,
                                                                    options: item.options.map(
                                                                        (
                                                                            optionItem,
                                                                            indexOption
                                                                        ) => {
                                                                            if (
                                                                                indexOption ===
                                                                                index
                                                                            ) {
                                                                                if (
                                                                                    optionItem.id
                                                                                ) {
                                                                                    return {
                                                                                        ...optionItem,
                                                                                        isDeleted: true,
                                                                                    };
                                                                                }
                                                                                else {
                                                                                    return {
                                                                                        display: '',
                                                                                    };
                                                                                }
                                                                            } else {
                                                                                return optionItem;
                                                                            }
                                                                        }
                                                                        )
                                                                };
                                                            } else {
                                                                return item;
                                                            }
                                                        }
                                                    ),
                                                });
                                            }}
                                        >
                                            {/*  icon to delete the option */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 inline-block"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            )
                        ))}
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                //edit the quiz
                                setQuizToEdit({
                                    ...quizToEdit,
                                    questions: quizToEdit.questions.map(
                                        (item, indexQuestion) => {
                                            if (indexQuestion === questionIndex) {
                                                return {
                                                    ...item,
                                                    options: [
                                                        ...item.options,
                                                        {
                                                            display: 'Add Answer',
                                                            isCorrect: false,
                                                        },
                                                    ],
                                                };
                                            } else {
                                                return item;
                                            }
                                        }
                                    ),
                                });
                            }}
                        >
                            Add Answer
                        </button>
                    </div>
                    )

                ))}
                <button
                    type="button"
                    className="bg-green-700  text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        //edit the quiz
                        setQuizToEdit({
                            ...quizToEdit,
                            questions: [
                                ...quizToEdit.questions,
                                {
                                    question: 'Add Question',
                                    options: [
                                        {
                                            display: 'Answer1',
                                            isCorrect: false,
                                        },
                                        {
                                            display: 'Answer2',
                                            isCorrect: false,
                                        },
                                    ],
                                },
                            ],
                        });
                    }
                    }

                >
                    Add Question
                </button>
                <div className="mt-4 mb-6">
                    {/*  put button on the right side of the form */}
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
                    >
                        Save Quiz
                    </button>
                </div>
            </form> )
            }



        </Layout>
    );
}
