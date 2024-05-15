import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid'
import { EyeIcon, HeartIcon } from '@heroicons/react/24/solid'
import { Button, Tooltip } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider'
import toast from 'react-hot-toast'

export default function BlogDetails() {
  const blog = useLoaderData()
  const { user } = useContext(AuthContext)
  const [comments, setComments] = useState([])

  const {
    _id,
    category,
    title,
    image,
    detailed_description,
    additional_info,
    viewcount,
    likes,
    description,
  } = blog
  const { author, published_date, email } = additional_info
  //   console.log(category, title, image)

  const handleAddComments = async (e) => {
    e.preventDefault()
    const comment = e.target.comments.value
    console.log(comment)

    if (user.email === additional_info.email) {
      toast.error('You cannot comment on your own post.')
    } else {
      const commentData = {
        image: user?.photoURL,
        comment: comment,
        blogId: _id,
        postedTime: new Date(),
        email: user?.email,
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_CONNECTION_STRING}/comments`,
          commentData
        )
        console.log(res.data)

        // Update comments state with the new comment
        setComments([...comments, res.data])
      } catch (error) {
        console.error('Error posting comment:', error)
      }
    }
    e.target.reset()
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_CONNECTION_STRING}/comments?blogId=${_id}`)
      .then((res) => setComments(res.data))
  })

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 ">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <div className="flex items-center gap-4">
                <p className="text-base font-semibold leading-7 text-indigo-600">
                  {category}
                </p>
                {user.email === email && (
                  <Tooltip title="Update Post">
                    <Link to={`/updateBlog/${_id}`}>
                      <button className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>
                    </Link>
                  </Tooltip>
                )}
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt=""
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>{detailed_description}</p>
              <p>
                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget
                risus enim. Mattis mauris semper sed amet vitae sed turpis id.
                Id dolor praesent donec est. Odio penatibus risus viverra tellus
                varius sit neque erat velit. Faucibus commodo massa rhoncus,
                volutpat. Dignissim sed eget risus enim. Mattis mauris semper
                sed amet vitae sed turpis id.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CloudArrowUpIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Author :
                    </strong>{' '}
                    {author}
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Published Date :
                    </strong>{' '}
                    {published_date}
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Email Address :
                    </strong>{' '}
                    {email}
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <EyeIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Viewcount :
                    </strong>{' '}
                    {likes}
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <HeartIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Like :
                    </strong>{' '}
                    {viewcount}
                  </span>
                </li>
              </ul>
              <div className="mt-12 ">
                <p className="font-bold">Comments</p>
                <div className="border-t p-4 flex flex-col gap-7">
                  {comments.map((comment) => (
                    <>
                      <div className="flex items-center gap-2">
                        <div>
                          <img
                            src={comment.image}
                            alt=""
                            className="h-6 w-6 rounded-full"
                          />
                        </div>
                        <div className="relative ">
                          <div className="border px-3 rounded-full">
                            <p className="">{comment.comment}</p>
                          </div>
                          <p className="text-[9px] absolute top-3/4 left-[10px]">
                            {comment.postedTime.slice(14, 19)}
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <form onSubmit={handleAddComments}>
                  <div className="flex gap-3 items-center mt-4">
                    {/* <form> */}
                    <input
                      type="text"
                      name="comments"
                      className="border w-2/3 rounded-xl pl-3 text-sm py-2"
                      placeholder="Add your comments"
                    />
                    <Button
                      type="submit"
                      value={'Search'}
                      className="border"
                      variant="contained"
                      size="small"
                    >
                      Comment
                    </Button>
                    {/* </form> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
