import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'

function Dashboard() {
  return (
    <div className='p-5 md:p-8'>
        <WelcomeBanner />
        <CourseList />
    </div>
  )
}

export default Dashboard