import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useBoardStore } from '@/store/boardStore'

const type = [
  {
    id:'todo',
    name: 'To Do',
    tagline: 'A new task to be compeleted',
    color:'bg-red-500',
  },
  {
    id:'inprogress',
    name: 'In Progress',
    tagline: 'A task that been currently in progress stage',
    color:'bg-yellow-500',
  },
  {
    id:'done',
    name: 'Done',
    tagline: 'A task that has been compeleted',
    color:'bg-green-500',
  },
]

const TaskTypeOptions=()=> {
const {setaddTaskType,addTaskType}=useBoardStore()
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={addTaskType} onChange={setaddTaskType}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {type.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan.id}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${
                    checked ? plan.color : null
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline`}
                          >
                            {plan.tagline}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
export default TaskTypeOptions
function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
