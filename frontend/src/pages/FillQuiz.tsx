import FormQuestion from "../components/form-question";
import Layout from "../components/layout";
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import quizService from '../services/QuizService';
import submissionService from '../services/QuizSubmissionService';
import { useState } from 'react'
import { useHistory } from 'react-router';


export default function FillQuiz(){
  const { id } = useParams<{ id: string }>();
  const userQuery = useQuery('user', async () => quizService.findOne(id));
  const [formInfo, setFormInfo] = useState({})
  const [mark, setMark] = useState(-1)
  const [error, setError] = useState<string>();
  const history = useHistory();
  
  const submitQuiz = async () => {
    try {
      const resp = await submissionService.save({
        idQuizz: id,
        fr: formInfo
      })
      console.log("---------------------------------------------------")
      console.log(resp)
      setError(null);
      setMark(resp.mark)
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  if(userQuery.isLoading || userQuery.data == null){
    return <p>Hello</p>
  }
  console.log(userQuery.data)
  return (
    <Layout>
      <h3 className="text-3xl font-bold dark:text-white">{userQuery.data.title}</h3>
      {error ? (
            <div className="text-red-500 p-3 font-semibold border rounded-md bg-red-50 mt-5">
              {error}
            </div>
          ) : null}
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="px-10">
        {
          userQuery.data.questions.map((ques) => {
            return (
              <div className="mt-5">
                <FormQuestion onChange={(val)=>{
                  const newData = {...formInfo}
                  newData[ques.id] = val
                  setFormInfo(newData)
                }} question={ques} />
              </div>
            )
          })
        }
      </div>
      <div className="flex justify-end px-10 mt-10 items-center gap-5 ">
        { mark != -1 && <div className="text-green-600">
          You scored {mark} marks in the test!
        </div> }
        <button onClick={submitQuiz} type="button" className="focus:outline-none text-white btn focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Submit</button>
      </div>
    </Layout>
  )
}