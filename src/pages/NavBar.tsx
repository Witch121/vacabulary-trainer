import { Disclosure, DisclosureButton} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import unicornLogo from '../assets/main-logo.jpg'
import { useAuth } from './userInfo'

const navigationForUsers = [
  { name: 'Home', href: '/', current: false},
  { name: 'Questions', href: '/questions', current: false },
  { name: 'Previous Answers', href: '/prevAnswers', current: false },
  { name: 'Sign Out', href: '/signout', current: false },
]

const navigationForNotUsers = [
  { name: 'Sign In', href: '/signin', current: false },
  { name: 'Sign Up', href: '/signup', current: false },
  { name: 'Home', href: '/', current: true },
]

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

const NavBar = () => {

const { user } = useAuth();
  return (
    <>
        <Disclosure as="nav" className="bg-gray-800 z-10">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 z-10">
            <div className="relative flex h-16 items-center justify-between z-10">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden z-10">
                {/* Mobile menu button*/}
                <DisclosureButton className=" z-10 group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                  <span className="absolute -inset-0.5 " />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src={unicornLogo}
                    className="h-8 w-auto"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {user
                      ? navigationForUsers.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                          >
                            {item.name}
                          </a>
                        ))
                      : navigationForNotUsers.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                          >
                            {item.name}
                          </a>
                        ))}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </Disclosure>
    </>
  );
};

export default NavBar;