'use client'

import { SelectBlock } from '@/components/SelectBlock'
import { SelectBlockPropsType } from '@/components/SelectBlock/types'
import { generateYears } from '@/constants'
import { icons } from '@/icons'
import { CarType } from '@/types'

import { fetchMakes } from '@/utils/httpClient'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [vehiclesData, setVehiclesData] = useState<CarType[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [selectedMake, setSelectedMake] = useState('')
  const [displayMakesList, setDisplayMakesList] = useState(false)
  const [makeValue, setMakeValue] = useState('')

  const [selectedYear, setSelectedYear] = useState('')
  const [displayYearsList, setDisplayYearsList] = useState(false)
  const [yearValue, setYearValue] = useState('')

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const makes = await fetchMakes()
        setVehiclesData(makes)
      } catch (error) {
        console.error('Error loading vehicle makes:', error)
      }
    }
    loadVehicles()
  }, [])

  const onSelectMake = (make: string, id: string) => {
    setSelectedMake(make)
    setSelectedId(id)
    toggleMakesList()
  }

  const toggleMakesList = () => {
    if (!displayMakesList) {
      setSelectedMake('')
      setSelectedId('')
      setMakeValue('')
    }
    setDisplayMakesList(!displayMakesList)
  }

  const toggleYearList = () => {
    if (!displayYearsList) {
      setSelectedYear('')
      setYearValue('')
    }
    setDisplayYearsList(!displayYearsList)
  }

  const filteredMakes = makeValue
    ? vehiclesData.filter(({ MakeName }) =>
        MakeName.toLowerCase().includes(makeValue.toLowerCase().trim()),
      )
    : vehiclesData

  const years = generateYears(2015)

  const makeBlock: SelectBlockPropsType = {
    displayList: displayMakesList,
    list: filteredMakes,
    placeholder: !selectedMake.length ? 'Choose make' : selectedMake,
    setValue: setMakeValue,
    toggleList: toggleMakesList,
    value: !!selectedMake ? selectedMake : makeValue || '',
    onSelectMake,
    variant: 'make',
  }

  const onSelectYear = (year: string) => {
    setSelectedYear(year)
    toggleYearList()
  }

  const yearsBlock: SelectBlockPropsType = {
    displayList: displayYearsList,
    list: years,
    placeholder: !selectedYear.length ? 'Choose year' : selectedYear.toString(),
    setValue: setYearValue,
    toggleList: toggleYearList,
    value: !!selectedYear.length ? selectedYear : yearValue || '',
    onSelectYear,
    variant: 'year',
  }

  const disabled = !selectedId || !selectedYear

  return (
    <section className="flex flex-col space-y-10 w-full justify-center items-center min-h-screen p-4">
      <div className="flex justify-center items-center">
        <h1 className="text-text text-3xl">{"Let's choose a car for you!"}</h1>
        <img src={icons.carSmile} className="w-[15%]" />
      </div>
      <div className="flex flex-col space-y-10 p-[50px] items-center bg-white rounded-lg shadow-md ">
        <div className="flex flex-col sm:space-x-20 sm:flex-row">
          <SelectBlock {...makeBlock} />
          <SelectBlock {...yearsBlock} />
        </div>

        <Link
          href={disabled ? '/' : `/result/${selectedId}/${selectedYear}`}
          className={` pr-10 pl-10 pt-3 pb-3 rounded-[8px] mb-10  ease-in-out ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-accent hover:bg-primary cursor-pointer'}`}
        >
          {'Next'}
        </Link>
      </div>
    </section>
  )
}
