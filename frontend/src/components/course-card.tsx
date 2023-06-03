import Course from "../models/course/Course"

interface ICourseCard{
  course: Course;
  onSelect: () => void
}

export default function CoruseCard({course, onSelect}: ICourseCard){
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg" style={{minWidth: 250}}>
      <img className="w-full"  src="https://picsum.photos/300/150" alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 pointer" onClick={onSelect}>{course.name}</div>
        <p className="text-gray-700 text-base">
          {course.description}
        </p>
      </div>
      {/* <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
      </div> */}
    </div>
  )
}