import { UserContext } from '@/Application/Contracts/Context/UserContext'
import { ArticleRepository } from '@/Application/Contracts/Repositories/ArticleRepository/ArticleRepository'
import { CreateArticleUseCase } from '@/Application/Modules/Articles/UseCases/CreateArticleUseCase/CreateArticleUseCase'
import { Article } from '@/Domain/Articles/Models/Article'
import { CreateArticleParams } from '@/Domain/Articles/UseCases/CreateArticle'
import { LoggedInUser } from '@/Domain/Users/Models/User'

interface Sut {
  sut: CreateArticleUseCase
  userContextStub: UserContext
  articleRepositoryStub: ArticleRepository
}

const loggedInUser: LoggedInUser = {
  created_at: 'any_date',
  email_id: 1,
  first_name: 'any_name',
  id: 1,
  last_name: 'any_name',
  updated_at: 'any_date',
  username_id: 1
}

function createUserContext(): UserContext {
  class UserContextStub implements UserContext {
    getLoggedInUser(): LoggedInUser {
      return loggedInUser
    }
    setLoggedInUser(user: LoggedInUser, callback: () => void): void {
      return
    }
  }
  return new UserContextStub()
}

function createArticleRepository() {
  class ArticleRepositoryStub implements ArticleRepository {
    async createArticle(params: CreateArticleParams): Promise<Article> {
      return Promise.resolve({
        body: 'any_body',
        created_at: 'any_date',
        id: 1,
        status: 'ACTIVE',
        title: 'any_title',
        updated_at: 'any_date',
        user_id: 1
      })
    }
  }
  return new ArticleRepositoryStub()
}

function createSut(): Sut {
  const userContextStub = createUserContext()
  const articleRepositoryStub = createArticleRepository()
  const sut = new CreateArticleUseCase(userContextStub, articleRepositoryStub)
  return {
    sut,
    userContextStub,
    articleRepositoryStub
  }
}

const createArticleParams: CreateArticleParams = {
  body: 'any_body',
  title: 'any_title'
}

describe('CreateArticle UseCase', () => {
  it('Should throw if UseContext throws', async () => {
    const { sut, userContextStub } = createSut()
    jest
      .spyOn(userContextStub, 'getLoggedInUser')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = sut.createArticle(createArticleParams)
    await expect(promise).rejects.toThrow()
  })
  it('Should throw if CreateArticle throws', async () => {
    const { sut, articleRepositoryStub } = createSut()
    jest
      .spyOn(articleRepositoryStub, 'createArticle')
      .mockRejectedValueOnce(new Error())
    const promise = sut.createArticle(createArticleParams)
    await expect(promise).rejects.toThrow()
  })
  it('Should call CreateArticle with correct values', async () => {
    const { sut, articleRepositoryStub } = createSut()
    const createArticleSpy = jest.spyOn(articleRepositoryStub, 'createArticle')
    await sut.createArticle(createArticleParams)
    expect(createArticleSpy).toHaveBeenCalledWith({
      body: createArticleParams.body,
      status: 'ACTIVE',
      title: createArticleParams.title,
      user_id: loggedInUser.id
    })
  })
})
