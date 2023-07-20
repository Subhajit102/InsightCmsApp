import { Time } from "@angular/common"

export interface Course{
    courseId: number,
    courseName: string,
    description: string,
    rating: number,
    category: number,
    instructor: string,
    reviews: string,
    courseThumbnail: string,
    sections: Sections[],
    price: number,
    displayPrice: number,
    lastUpdated: Date,
    language: string,
    NumberOfSections:number,
    NumberOfTopics:number,
    CourseLength: Time
}

export interface Sections{
    sectionId: number,
    sectionName: string,
    accordianOpen: boolean,
    topics: Topics[]
}

export interface Topics{
    topicId: number,
    sectionId: number,
    topicName: string,
    mediaLink: string,
    preview: boolean
}

export interface CourseReviews{
    reviewId: number,
    courseId: number,
    userId: number,
    userName: string,
    rating: number,
    review: string
}

export interface UserCourse{
    userCourseId: number,
    userId: number,
    courseId: number,
    lastSectionId: number,
    lastTopicId: number,
    lastTopicTime: string,
    topicsCompleted: string,
    numberOfTopicsCompleted:number
}

