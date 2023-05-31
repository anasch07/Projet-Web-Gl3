import { useState } from 'react';
import { Loader, Plus, X } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import CoursesTable from '../../components/courses/CoursesTable';
import Layout from '../../components/layout';
import QuizzesTable from '../../components/quizzes/QuizzesTable';
import Modal from '../../components/shared/Modal';
import useAuth from '../../hooks/useAuth';
import CreateCourseRequest from '../../models/course/CreateCourseRequest';
import courseService from '../../services/CourseService';

export default function QuizzesTeacher() {
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

  return (
    <Layout>
      <h1 className="font-semibold text-3xl mb-5">Manage Quizzes</h1>
      <hr />
      {authenticatedUser.role !== 'user' ? (
        <button
          className="btn my-5 flex gap-2 w-full sm:w-auto justify-center"
          //redirect to add quiz page
          onClick={() => (window.location.href = '/add-quiz')}
        >
          <Plus /> Add Quiz
        </button>
      ) : null}

      <div className="table-filter">
        <div className="flex flex-row gap-5">
          <input
            type="text"
            className="input w-1/2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="input w-1/2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <QuizzesTable data={data} isLoading={isLoading} />
    </Layout>
  );
}
