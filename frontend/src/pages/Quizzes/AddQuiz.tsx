import { useState } from 'react';
import { Loader, Plus, X } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import CoursesTable from '../../components/courses/CoursesTable';
import Layout from '../../components/layout';
import Modal from '../../components/shared/Modal';
import useAuth from '../../hooks/useAuth';
import CreateCourseRequest from '../../models/course/CreateCourseRequest';
import courseService from '../../services/CourseService';

export default function AddQuiz() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [addCourseShow, setAddCourseShow] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const { authenticatedUser } = useAuth();
  const { data, isLoading } = useQuery(
    ['courses', name, description],
    () =>
      courseService.findAll({
        name: name || undefined,
        description: description || undefined,
      }),
    {
      refetchInterval: 1000,
    },
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateCourseRequest>();

  const saveCourse = async (createCourseRequest: CreateCourseRequest) => {
    try {
      await courseService.save(createCourseRequest);
      setAddCourseShow(false);
      reset();
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  {
    /*  form that contains the chapter , then the teacher cann add questions and answers(radios buttons) as much as he wants */
  }
  const [questions, setQuestions] = useState([
    {
      question: '',
      answers: [
        {
          answer: '',
          isCorrect: false,
        },
      ],
    },
  ]);

  const AddQuestion = () => {
    let NewQuestion = {
      question: '',
      answers: [
        {
          answer: '',
          isCorrect: false,
        },
      ],
    };
    setQuestions([...questions, NewQuestion]);
  };

  return (
    <Layout>
      <h1 className="font-semibold text-3xl mb-5">Add Quiz</h1>
      <hr />
      <form>
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
          >
            <option value="chapter1">Chapter 1</option>
            <option value="chapter2">Chapter 2</option>
            <option value="chapter3">Chapter 3</option>
            <option value="chapter4">Chapter 4</option>
            <option value="chapter5">Chapter 5</option>
          </select>
        </div>

        {/*I want that the teacher add questions and answers as much as he wants , so there is a button to add a question and a button to add an answer */}

        {questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="border-2 border-gray-300 rounded-lg p-4 mb-4"
          >
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
              />
            </div>
            {/*      map over the answers and add them to the question and each answer is a radio button + content of the answer */}
            {question.answers.map((answer, index) => (
              <div key={index}>
                <div className="mt-4 mb-6">
                  <label
                    htmlFor="Question"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Answer {index + 1}
                  </label>
                  {/*  in same line there is a radio button and a text input for the answer */}
                  <div className="flex">
                    <input
                      type="radio"
                      id={questionIndex.toString()}
                      name="answer"
                      value="answer"
                    />
                    <input
                      type="text"
                      id="question"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                let newQuestions = [...questions];
                newQuestions[questionIndex].answers.push({
                  answer: '',
                  isCorrect: false,
                });
                setQuestions(newQuestions);
              }}
            >
              Add Answer
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => AddQuestion()}
        >
          Add Question
        </button>
      </form>
    </Layout>
  );
}
