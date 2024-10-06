import { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Breadcrumb as BreadcrumbFB, theme } from "flowbite-react"
import Container from '../layouts/Container'
import { Link } from 'react-router-dom'
import { HiHome } from 'react-icons/hi'

type State = HTMLAttributes<HTMLDivElement> & {
  data: {
    title: string,
    link?: string
  }[]
}

const breadcrumbItemTheme = theme["breadcrumb"].item
breadcrumbItemTheme.chevron += " flex-none"
breadcrumbItemTheme.href.on += " flex-grow min-w-0"
breadcrumbItemTheme.href.off += " flex-grow min-w-0"

const Breadcrumb: FC<State> = (props) => {
  const { className, data = [], ...rest } = props

  return (
    <section {...rest} className={twMerge('', className)}>
      <Container className='py-6'>
        <BreadcrumbFB>
          <BreadcrumbFB.Item icon={HiHome} className="flex-none">
            <Link to={"/"}>Trang chủ</Link>
          </BreadcrumbFB.Item>
          { data.map((v,i) =>
            <BreadcrumbFB.Item key={i} theme={breadcrumbItemTheme} className={i < (data.length - 1) ? 'flex-none' : 'flex-grow min-w-0'}>
              { v.link
                ? <Link to={v.link}>{v.title}</Link>
                : <a href='#' className="truncate">{v.title}</a>
              }
            </BreadcrumbFB.Item>
          )}
        </BreadcrumbFB>
      </Container>
    </section>
  )
}

export default Breadcrumb