export class WebsiteDto {
    constructor(id: string, name: string, description: string, link: string, category: string, tags: string[], votes: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.link = link;
        this.category = category;
        this.tags = tags;
        this.votes = votes;
    }

    id: string;
    name: string;
    description: string;
    link: string;
    category: string;
    tags: string[];
    votes: number;
}