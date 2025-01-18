import { generateYears } from '@/constants'
import { icons } from '@/icons'
import { ModelType } from '@/types'
import { fetchMakes, fetchModels } from '@/utils/httpClient'
import Link from 'next/link'
import { Suspense } from 'react'

export interface Params {
  makeId: string
  year: string
}

export async function generateStaticParams() {
  const makes = await fetchMakes()
  const years = generateYears(2015)

  const paths = []

  for (const make of makes.slice(0, 10)) {
    for (const year of years) {
      paths.push({ makeId: make.MakeId.toString(), year: year.toString() })
    }
  }

  return paths
}

const ResultPage = async ({ params }: { params: Promise<Params> }) => {
  const { makeId, year } = await params
  const models = (await fetchModels(makeId, year)) as ModelType[]

  return (
    <main className={'p-6 bg-gray-50 min-h-screen'}>
      <Suspense fallback={<p>Loading models...</p>}>
        {models.length > 0 ? (
          <>
            <h1 className={'text-3xl font-semibold text-gray-800 mb-6'}>
              {'Models for Make: '}
              <span className={'text-primary'}>{models[0]?.Make_Name}</span>
              {' and Year: '}
              <span className={'text-primary'}>{year}</span>
            </h1>
            <div className="flex flex-col space-y-10">
              {models.map((item) => (
                <div
                  className="bg-white rounded-lg shadow-md p-[15px]"
                  key={item.Model_ID}
                >
                  <p className="text-gray-800 p-[15px]">
                    <span className={'text-primary'}>{'Make:'}</span>{' '}
                    {item.Make_Name}
                  </p>
                  <p className="text-gray-800 p-[15px]">
                    <span className={'text-secondary'}>{'Model:'}</span>{' '}
                    {item.Model_Name}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center p-4">
            <p className={'text-text  text-3xl mt-4'}>
              {'No models found for the selected make and year =('}
            </p>
            <img src={icons.car} className="w-[45%]" />
            <Link
              href={'/'}
              className="pr-10 pl-10 pt-3 pb-3 rounded-[8px] mb-10  ease-in-out bg-accent hover:bg-primary cursor-pointer"
            >
              {'Back to home'}
            </Link>
          </div>
        )}
      </Suspense>
    </main>
  )
}

export default ResultPage
