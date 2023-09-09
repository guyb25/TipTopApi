export class WebsiteDto {
    constructor(name: string, description: string, link: string, category: string, tags: string[], votes: number) {
        this.name = name;
        this.description = description;
        this.link = link;
        this.category = category;
        this.tags = tags;
        this.votes = votes;
    }

    name: string;
    description: string;
    link: string;
    category: string;
    tags: string[];
    votes: number;
}