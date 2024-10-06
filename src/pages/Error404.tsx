import Container from '../components/layouts/Container'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <Container className='py-6 md:py-9 lg:py-12 text-center'>
      <div className="flex flex-col space-y-4">
        <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500">404</h4>
        <p>Trang bạn tìm kiếm không tồn tại</p>

        <Button as={Link} to={"/"} className="self-center">Về trang chủ</Button>
      </div>
    </Container>
  )
}

export default Error404