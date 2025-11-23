
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Author {
    id: number;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    posts?: Nullable<Nullable<Post>[]>;
}

export class Post {
    id: number;
    title: string;
    votes?: Nullable<number>;
    comments?: Nullable<Nullable<Comment>[]>;
}

export class Comment {
    id: number;
    content: string;
}

export abstract class IQuery {
    abstract author(id: number): Nullable<Author> | Promise<Nullable<Author>>;
}

export abstract class IMutation {
    abstract upvotePost(postId: number): Nullable<Post> | Promise<Nullable<Post>>;

    abstract addComment(postId: number, content: string): Nullable<Comment> | Promise<Nullable<Comment>>;
}

export abstract class ISubscription {
    abstract commentAdded(): Comment | Promise<Comment>;
}

type Nullable<T> = T | null;
