import { RegisterWebsiteDto } from "src/models/dtos/accountManagement/registerWebsiteDto";

export const registerWebsiteDtoStub: RegisterWebsiteDto = {
    name: 'name',
    username: 'username',
    password: 'password',
    description: 'description',
    category: 'category',
    tags: ['tag1', 'tag2'],
    email: 'email@gmail.com',
    link: 'link'
}