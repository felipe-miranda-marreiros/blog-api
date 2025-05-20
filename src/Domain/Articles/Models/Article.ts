export interface Article {
  id: number
  title: string
  body: string
  user_id: number
  status: 'ACTIVE' | 'ARCHIVED'
  created_at: string
  updated_at: string
}
