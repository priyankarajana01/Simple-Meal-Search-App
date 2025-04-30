import './App.css'
import { Card } from '../components/Card'
import MainLayout from '../layouts/MainLayout'

function App() {
  return (
    <MainLayout>  
      <div className="flex justify-center items-center min-h-screen">
        <Card title="Delicious meal 1" description="This is a sample description for meal" image="https://www.shutterstock.com/image-photo/healthy-salad-plate-tomatoes-chickpeas-600nw-2427459441.jpg"/>
        <Card  title="Delicious meal 2" description="This is a sample description for meal" image="https://www.shutterstock.com/image-photo/healthy-salad-plate-tomatoes-chickpeas-600nw-2427459441.jpg"/>
      
      </div>
    </MainLayout>
  )
}

export default App
