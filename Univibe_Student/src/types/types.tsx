export interface ProgrammeCardType {
    title: string;
    portraitImgUrl: string;
    landscapeImgUrl: string;
    _id: string;
    rating: number;
    theme: string[];
    description: string;
    duration: number;
    cast: CelebrityCardType[];
    crew: CelebrityCardType[];

}

export interface CelebrityCardType{
    name: string;
    imageUrl: string;
    _id: string;
    role: string;
}