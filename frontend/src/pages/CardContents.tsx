import CoruseCard from "../components/course-card";
import { useQuery } from 'react-query';
import courseService from '../services/CourseService';
import contentService from '../services/ContentService';
import { useState } from 'react'
import Layout from "../components/layout";
import ContentDisplayTable from "../components/content-table-display";
import Content from "../models/content/Content";
import ContentsTable from "../components/content/ContentsTable";

export default function CardContents(){
  const coursesQuery = useQuery('user', async () => courseService.findAll({}));
  const [displayData, setDisplayData] = useState<Content[]>([])
  const [selectedCourse, setSelectedCourse] = useState("")
  if(coursesQuery.isLoading || coursesQuery.data == null){
    return <p>Hello</p>
  }
  console.log(coursesQuery.data)
  return (
    <Layout>
      <div className="flex flex-row overflow-x-auto scrolling-wrapper gap-5">
        {
          coursesQuery.data.map((course) => {
            return (
              <CoruseCard 
                course={course} 
                onSelect={async () => {
                  console.log("HEEEEEEEEEEEEEEEEEEERE")
                  setSelectedCourse(course.id)
                  const data: Content[] = await contentService.findAllWithCoursesById(course.id)
                  console.log("----------------------------------------------------")
                  console.log(data)
                  setDisplayData(data)
                }}
              />
            )
          })
        }
      </div>
      <ContentDisplayTable content={displayData} />
    </Layout>
  )
}