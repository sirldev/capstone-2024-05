import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

export default function ChatRoomPage() {
  return (
    <div className="flex h-screen max-h-screen w-full min-w-desktop flex-col bg-blue-200 text-[#2A2A2A]">
      <div className="relative mx-auto flex h-full max-h-screen min-h-screen w-desktop flex-col items-center justify-center bg-white">
        <header className="sticky left-0 right-0 top-0 flex w-full items-center justify-between bg-white px-4 py-3 shadow-md">
          <ChevronLeftIcon className="h-6 w-6" />
          <MagnifyingGlassIcon className="h-6 w-6" />
        </header>
        <section className="w-full flex-1 overflow-y-hidden bg-white">
          <div className="flex h-full flex-col gap-y-2 overflow-y-scroll">
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row py-[13px] pl-4 pr-[52px] text-[#575D68]'
              }
            >
              <UserCircleIcon className="mr-2.5 h-[40px] w-[40px]" />

              {/* {index === conversation?.length - 1 ? (
                // <TypingText value={item.content} />
                <h1
                  style={{
                    borderRadius: '8px',
                  }}
                  className={'flex flex-row bg-[#EAF4FC] p-2.5'}
                >
                  {item.content.replace(/할부원금이\s[0-9|,]*원\s이므로/, '')}
                </h1>
              ) : (
                <h1
                  style={{
                    borderRadius: '8px',
                  }}
                  className={'flex flex-row bg-[#EAF4FC] p-2.5'}
                >
                  {item.content.replace(/할부원금이\s[0-9|,]*원\s이므로/, '')}
                </h1>
              )} */}
              <h1
                style={{
                  borderRadius: '8px',
                }}
                className={'flex flex-row bg-[#EAF4FC] p-2.5'}
              >
                fdasfsafsafas
              </h1>
              <div
                className={
                  'ml-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px]'
                }
              >
                12:34
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>
            <div
              className={
                'flex h-fit w-full flex-row justify-end pl-[70px] pr-4 text-white'
              }
            >
              <div
                className={
                  'mr-2.5 flex h-auto items-end text-[10px] font-normal leading-[12px] text-[#575D68]'
                }
              >
                12:34
              </div>
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#0076E2] p-2.5'}
              >
                fasfsaf
              </div>
            </div>

            <div
              className={
                'flex h-fit w-full flex-row py-[13px] pl-4 pr-[52px] text-[#575D68]'
              }
            >
              <UserCircleIcon className={'mr-2.5 h-[40px] w-[40px]'} />
              <div
                style={{
                  borderRadius: '8px',
                }}
                className={'bg-[#EAF4FC] p-2.5'}
              >
                <div className={'flex flex-row'}>
                  <div
                    key={1}
                    style={{
                      animation: 'bounceUnder 1s infinite',
                    }}
                  >
                    {'\u2022'}
                  </div>
                  <div
                    key={2}
                    style={{
                      animation: 'bounceUnder 1s infinite',
                      animationDelay: '0.2s',
                    }}
                  >
                    {'\u2022'}
                  </div>
                  <div
                    key={3}
                    style={{
                      animation: 'bounceUnder 1s infinite',
                      animationDelay: '0.4s',
                    }}
                  >
                    {'\u2022'}
                  </div>
                  <div
                    key={4}
                    style={{
                      animation: 'bounceUnder 1s infinite',
                      animationDelay: '0.6s',
                    }}
                  >
                    {'\u2022'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="absoulte bottom-0 left-0 right-0 flex w-full items-center justify-between gap-x-2 px-4 py-2 shadow-md ">
          <PlusIcon className="h-6 w-6" />
          <input className="flex-1 rounded-lg bg-[#E3E3E3] px-4 py-2 text-lg"></input>
        </div>
      </div>
    </div>
  );
}
