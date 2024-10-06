import { Link } from 'react-router-dom'
import Container from '../components/layouts/Container'
import { Button } from 'flowbite-react'

const Error = () => {

  return (
    <Container>
      <div className="flex flex-col space-y-4">
        <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500">Lỗi</h4>
        <p>Đã có lỗi xảy ra</p>

        <Button as={Link} to={"/"} className="self-center">Về trang chủ</Button>
      </div>
    </Container>
  )
}

export default Error