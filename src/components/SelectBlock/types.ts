import { CarType } from '@/types'

export interface SelectBlockPropsType {
  setValue: (value: string) => void
  displayList: boolean
  placeholder: string
  value: string
  toggleList: () => void
  list: string[] | CarType[]
  variant: 'year' | 'make'
  onSelectYear?: (year: string) => void
  onSelectMake?: (MakeName: string, MakeId: string) => void
}
