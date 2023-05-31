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

export default function AddQuiz() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [deadlineDate, setDeadlineDate] = useState<Date>();
  const [chapterId, setChapterId] = useState<string>();

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

  const AddQuestion = () => {
    let NewQuestion = {
      question: '',
      options: [
        {
          option: '',
          isCorrect: false,
        },
      ],
    };
    setQuestions([...questions, NewQuestion]);
  };

  const AddAnswer = (questionIndex: number) => {
    let NewAnswer = {
      option: '',
      isCorrect: false,
    };
    let newQuestions = [...questions];
    newQuestions[questionIndex].options.push(NewAnswer);
    setQuestions(newQuestions);
  };

  // const data: any = ContentService.findAllWithCourses().then((res) => {
  //   console.log('res: ', res);
  //   return res;
  // });

  useEffect(() => {
    ContentService.findAllWithCourses().then((res) => {
      console.log('res: ', res);
      setData(res);
      setChapterId(res[0].id);
    });
  }, []);

  const handleSaveQuiz = async (e) => {
    e.preventDefault();
    const response = await QuizService.save({
      chapterId: chapterId,
      questions: questions,
      title: title,
      description: description,
      scheduleDate: scheduleDate,
      deadlineDate: deadlineDate,
    });
    if (response.status === 201) {
      window.location.href = '/QuizzesTeacher';
    } else {
      setError("Couldn't add quiz verify your data");
    }
  };

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
            onChange={(e) => setChapterId(e.target.value)}
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
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
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
            onChange={(e) => setScheduleDate(new Date(e.target.value))}
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
            onChange={(e) => setDeadlineDate(new Date(e.target.value))}
          />
        </div>

        {/*I want that the teacher add questions and options as much as he wants , so there is a button to add a question and a button to add an option */}

        {questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="border-2 border-gray-300 rounded-lg p-4 mb-4"
          >
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
              onClick={() => {
                let newQuestions = [...questions];
                newQuestions.splice(questionIndex, 1);
                setQuestions(newQuestions);
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
                onChange={(e) => {
                  let newQuestions = [...questions];
                  newQuestions[questionIndex].question = e.target.value;
                  setQuestions(newQuestions);
                }}
              />
            </div>
            {question.options.map((option, index) => (
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
                      id={questionIndex.toString().concat('question')}
                      name={questionIndex.toString().concat('question')}
                      value="option"
                      className="mr-2"
                      onChange={(e) => {
                        let newQuestions = [...questions];
                        //make all the other options of the question false
                        newQuestions[questionIndex].options.forEach(
                          (option) => (option.isCorrect = false),
                        );
                        //make the option that the teacher choose true
                        newQuestions[questionIndex].options[index].isCorrect =
                          e.target.checked;
                        setQuestions(newQuestions);
                      }}
                    />
                    <input
                      type="text"
                      id="question"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => editAnswer(questionIndex, index, e)}
                    />
                    {/* icon to delete the option */}
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded  ml-1"
                      onClick={() => {
                        let newQuestions = [...questions];
                        newQuestions[questionIndex].options.splice(index, 1);
                        setQuestions(newQuestions);
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
            ))}
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                let newQuestions = [...questions];
                newQuestions[questionIndex].options.push({
                  option: '',
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
          className="bg-green-700  text-white font-bold py-2 px-4 rounded"
          onClick={() => AddQuestion()}
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
      </form>
    </Layout>
  );
}
