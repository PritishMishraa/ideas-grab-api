<h1 align="center"> ideas-grab-apis </h1>

<p align="center">
  <img src="./public/heading.png" />
</p>

## About

## Technologies
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## API Reference 

### Get random idea

```HTTP
GET /random
```

Returns a single random idea from the database

**Response**

```js
{
  idea: {
    _id: string,
    idea: string
  }
}
```


**Example**

Random Idea `>>` [try in browser](https://ideas-grab-api.herokuapp.com/random)

```HTTP
GET /random
```

### Get random ideas

```HTTP
GET /random-ideas
```

Returns a list of random ideas from the database

**Query parameters**

| prams 	|  type 	|              description             	| default 	| max 	|
|:-----:	|:-----:	|:------------------------------------:	|:-------:	|:---:	|
| limit 	| `int` 	| number of ideas returned per request 	|    10   	|  25 	|                                                              

**Response**

```js
{
  count: number,
  ideas: [
    {
      _id: string,
      idea: string
    },...
  ]
}
```

**Example**

Random Ideas `>>` [try in browser](https://ideas-grab-api.herokuapp.com/random-ideas)

```HTTP
GET /random-ideas
```

Random Ideas with a limit of 15 ideas `>>` [try in browser](https://ideas-grab-api.herokuapp.com/random-ideas?limit=15)

```HTTP
GET /random-ideas?limit=15
```


### Get ideas

```HTTP
GET /ideas
```

Returns a list of all the ideas from the database (__paginated__)

**Query parameters**

| prams 	|  type 	|            description            	| default 	| max 	|
|:-----:	|:-----:	|:---------------------------------:	|:-------:	|:---:	|
| limit 	| `int` 	| number of ideas returned per page 	|    10   	|  25 	|
|  page 	| `int` 	| page number                       	|    1    	|     	|
                                                          

**Response**

```js
{
  metaData: {
    count: number,
    currentPage: number,
    totalPage: number,
    totalCount: number,
    lastItemIndex: number
  },
  ideas: [
    {
      _id: string,
      idea: string
    },...
  ]
}
```
