import { useState } from 'react';
import { AlertTriangle, Loader, X } from 'react-feather';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import Course from '../../models/course/Course';
import UpdateCourseRequest from '../../models/course/UpdateCourseRequest';
import courseService from '../../services/CourseService';
import Modal from '../shared/Modal';
import Table from '../shared/Table';
import TableItem from '../shared/TableItem';
import quizService from "../../services/QuizService";


export default function QuizzesTable({ data, isLoading }: any) {
  const { authenticatedUser } = useAuth();
  const [deleteShow, setDeleteShow] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>();
  const [error, setError] = useState<string>();
  const [updateShow, setUpdateShow] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
  } = useForm<UpdateCourseRequest>();

  const handleDelete = async () => {
    try {
      const res = await quizService.delete(selectedCourseId);
        if(res){
            setDeleteShow(false);
        }
    } catch (error) {
        setError(error.response.data.message);
    }
  };

  const handleUpdate = async (updateCourseRequest: UpdateCourseRequest) => {
    try {
      await courseService.update(selectedCourseId, updateCourseRequest);
      setUpdateShow(false);
      reset();
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  console.log("data", data)

  return (
    <>
      {/*center */}
      <div className="table-container">
        <Table
          columns={['Course', 'Chapter','Title','Description',  'NumberOfQuestions', 'Action']}
        >
          {isLoading
            ? null
            : data.map((item,index) => (
                <tr key={index}>
                  <TableItem>
                    <Link to={`/courses/${item.chaptre.course.id}`}>{item.chaptre.course.name}</Link>
                  </TableItem>
                  <TableItem>{item.chaptre.name}</TableItem>
                  <TableItem>
                    {item.title}
                  </TableItem>
                  <TableItem>
                    {item.description}
                  </TableItem>
                  <TableItem>
                    {item.questions.length}
                  </TableItem>
                  <TableItem className="">
                    {['admin', 'teacher'].includes(authenticatedUser.role) ? (
                      <button
                        className="text-indigo-600 hover:text-indigo-900 focus:outline-none mr-4"
                        onClick={() => {
                          //redirect to edit quiz page
                          window.location.href = `/edit-quiz/${item.id}`;
                        }
                        }
                      >
                        Edit
                      </button>
                    ) : null}
                    {authenticatedUser.role === 'admin' ? (
                      <button
                        className="text-red-600 hover:text-red-900  focus:outline-none"
                        onClick={
                            () => {
                                setSelectedCourseId(item.id);
                                setDeleteShow(true);
                            }
                            }
                      >
                        Delete
                      </button>
                    ) : null}
                  </TableItem>
                </tr>
              ))}
        </Table>
        {!isLoading && data.length < 1 ? (
          <div className="text-center my-5 text-gray-500">
            <h1>Empty</h1>
          </div>
        ) : null}
      </div>
      {/* Delete Course Modal */}
      <Modal show={deleteShow}>
        <AlertTriangle size={30} className="text-red-500 mr-5 fixed" />
        <div className="ml-10">
          <h3 className="mb-2 font-semibold">Delete Quizz</h3>
          <hr />
          <p className="mt-2">
            Are you sure you want to delete the Quizz? All of Quizz's data
            will be permanently removed.
            <br />
            This action cannot be undone.
          </p>
        </div>
        <div className="flex flex-row gap-3 justify-end mt-5">
          <button
            className="btn"
            onClick={() => {
              setError(null);
              setDeleteShow(false);
            }}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="btn danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader className="mx-auto animate-spin" />
            ) : (
              'Delete'
            )}
          </button>
        </div>
        {error ? (
          <div className="text-red-500 p-3 font-semibold border rounded-md bg-red-50">
            {error}
          </div>
        ) : null}
      </Modal>
      {/* Update Course Modal */}

    </>
  );
}
