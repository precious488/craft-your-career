export default function ContactForm() {
  return (
    <section className='px-4 md:px-6 py-6 mt-12'>
      <h2 className='text-3xl font-bold text-slate-900 mb-6 md:text-4xl dark:text-slate-50 align-text-center'>
        Contact us
      </h2>
      <div className='grid md:grid-cols-2 items-start gap-16 mx-auto max-w-5xl'>
        <div>
          <div className='mb-12'>
            <h2 className='text-3xl font-bold text-slate-900 mb-6 md:text-4xl dark:text-slate-50'>
              Let's Talk
            </h2>
            <p className='text-base leading-relaxed text-slate-600 dark:text-slate-400'>
              Have some big idea or brand to develop and need help? Then reach
              out we'd love to hear about your project and provide help.
            </p>
          </div>

          <div className='mt-12'>
            <h3 className='text-slate-900 text-base font-semibold dark:text-slate-50'>
              Email
            </h3>
            <ul className='mt-4'>
              <li className='flex items-center'>
                <div className='flex items-center bg-slate-200 dark:bg-neutral-800 w-8 h-8 p-2 rounded-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='fill-current text-slate-600 dark:text-slate-50'
                    stroke='currentColor'
                    viewBox='0 0 682.667 682.667'
                    aria-hidden='true'
                  >
                    <defs>
                      <clipPath id='a' clipPathUnits='userSpaceOnUse'>
                        <path d='M0 512h512V0H0Z' data-original='#000000' />
                      </clipPath>
                    </defs>
                    <g
                      clipPath='url(#a)'
                      transform='matrix(1.33 0 0 -1.33 0 682.667)'
                    >
                      <path
                        fill='none'
                        strokeMiterlimit='10'
                        strokeWidth='40'
                        d='M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z'
                        data-original='#000000'
                      />
                      <path
                        d='M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z'
                        data-original='#000000'
                      />
                    </g>
                  </svg>
                </div>
                <a href='#' className='text-sm ml-4'>
                  <small className='block text-slate-900 dark:text-slate-50'>
                    Mail
                  </small>
                  <span className='font-semibold text-blue-600 dark:text-slate-400'>
                    info@example.com
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className='mt-8'>
            <h3 className='text-slate-900 text-base font-semibold dark:text-slate-50'>
              Socials
            </h3>
            <ul className='flex flex-wrap gap-4 mt-4'>
              <li>
                <a
                  href='#'
                  className='flex items-center bg-slate-200 dark:bg-neutral-800 w-8 h-8 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
                  aria-label='Facebook'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='size-full fill-slate-600 dark:fill-slate-50'
                    viewBox='0 0 155.139 155.139'
                    aria-hidden='true'
                  >
                    <path
                      d='M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761z'
                      data-original='#010002'
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center bg-slate-200 dark:bg-neutral-800 w-8 h-8 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
                  aria-label='LinkedIn'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='size-full fill-slate-600 dark:fill-slate-50'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      d='M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0'
                      data-original='#000000'
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center bg-slate-200 dark:bg-neutral-800 w-8 h-8 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
                  aria-label='X'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='size-full fill-slate-600 dark:fill-slate-50'
                    viewBox='0 0 1226.37 1226.37'
                    aria-hidden='true'
                  >
                    <path
                      d='M727.348 519.284 1174.075 0h-105.86L680.322 450.887 370.513 0H13.185l468.492 681.821L13.185 1226.37h105.866l409.625-476.152 327.181 476.152h357.328L727.322 519.284zM582.35 687.828l-47.468-67.894-377.686-540.24H319.8l304.797 435.991 47.468 67.894 396.2 566.721H905.661L582.35 687.854z'
                      data-original='#000000'
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <form className='space-y-4'>
          <div>
            <label
              htmlFor='name'
              className='mb-2 text-slate-900 dark:text-slate-50 font-medium text-sm inline-block'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='John doe'
              className='px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700'
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='mb-2 text-slate-900 dark:text-slate-50 font-medium text-sm inline-block'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='john@readymadeui.com'
              className='px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700'
            />
          </div>
          <div>
            <label
              htmlFor='phone'
              className='mb-2 text-slate-900 dark:text-slate-50 font-medium text-sm inline-block'
            >
              Phone number
            </label>
            <input
              type='number'
              id='phone'
              name='phone'
              placeholder='+11800-259-854'
              className='px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700'
            />
          </div>
          <div>
            <label
              htmlFor='message'
              className='mb-2 text-slate-900 dark:text-slate-50 font-medium text-sm inline-block'
            >
              Message
            </label>
            <textarea
              placeholder='Write message'
              rows={5}
              id='message'
              name='message'
              className='px-3 py-2.5 text-sm text-slate-900 w-full rounded-md bg-white outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-800 dark:outline-neutral-700'
            ></textarea>
          </div>

          <button
            type='submit'
            className='py-2.5 px-4 text-sm rounded-md font-semibold cursor-pointer text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  )
}
