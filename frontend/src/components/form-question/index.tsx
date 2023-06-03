interface IQuestionOption {
  display: string;
  id: string;
}

interface IFormQuestion {
  question: {
    id: string;
    question: string;
    mark: number;
    options: IQuestionOption[];
  },
  onChange: (value: string) => void
}

export default function FormQuestion({question, onChange}: IFormQuestion){
  return (
    <div className="w-full" >
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">{question.question} <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">({question.mark} mark)</small></h3>
      <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {
          question.options.map((opt) => {
            return (
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="w-full flex items-center pl-3">
                  <input onChange={(e) => {
                    onChange(e.target.value)
                  }} id={question.id} type="radio" value={opt.id} name={question.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="list-radio-license" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{opt.display}</label>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}