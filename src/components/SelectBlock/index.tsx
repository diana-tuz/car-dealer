import { icons } from '@/icons'
import { CarType } from '@/types'
import { FC } from 'react'
import { SelectBlockPropsType } from './types'

export const SelectBlock: FC<SelectBlockPropsType> = ({
  setValue,
  displayList,
  placeholder,
  value,
  toggleList,
  list,
  variant,
  onSelectYear,
  onSelectMake,
}) => (
  <div className="flex flex-col">
    <div className="flex flex-col items-start w-full max-w-lg relative">
      <p className="pl-6 text-text">{`Select ${variant}:`}</p>
      <div className="flex w-full p-6">
        <div
          className="flex items-center bg-default text-text rounded-[8px] w-[250px]"
          onClick={() => variant === 'year' && toggleList()}
        >
          {variant === 'year' ? (
            <p className="w-full p-2 cursor-pointer">{placeholder}</p>
          ) : (
            <input
              className="bg-default cursor-pointer text-text placeholder:text-text rounded-[8px] p-2 w-full focus:outline-none"
              onChange={(event) => setValue(event.target.value)}
              onClick={() => !displayList && toggleList()}
              placeholder={placeholder}
              value={value}
            />
          )}
          <img
            className={`transform transition-transform duration-500 cursor-pointer ${displayList ? 'rotate-0' : 'rotate-180'}`}
            src={icons.arrow}
            onClick={toggleList}
          />
        </div>
      </div>

      {displayList && (
        <div
          className="absolute w-full bg-white p-4 shadow-lg rounded-lg max-h-[200px] overflow-auto transition-all duration-300 ease-in-out z-10"
          style={{ top: '100%' }}
        >
          {variant === 'year' ? (
            <>
              {list.map((year) => (
                <button
                  key={year as string}
                  onClick={() => onSelectYear && onSelectYear(year as string)}
                  className="w-full text-left p-2 hover:bg-gray-100 rounded"
                >
                  {year as string}
                </button>
              ))}
            </>
          ) : (
            <>
              {list.map((item) => {
                const { MakeName, MakeId } = item as CarType
                return (
                  <button
                    key={MakeId}
                    onClick={() =>
                      onSelectMake && onSelectMake(MakeName, MakeId.toString())
                    }
                    className="w-full text-left p-2 hover:bg-gray-100 rounded"
                  >
                    {MakeName}
                  </button>
                )
              })}
            </>
          )}
        </div>
      )}
    </div>
  </div>
)
