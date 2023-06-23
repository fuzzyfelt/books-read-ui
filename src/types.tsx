export interface Book {
  id: number,
  title: string, 
  date: string | Date,
  recommend: Boolean,
  authors: string[],
  comment: string
}

export interface Author {
  id: number,
  name: string
}

export interface BookListData {
  rows: Book[],
  total_rows: number
}

export interface Token {
  token: string
}